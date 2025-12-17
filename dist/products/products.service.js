"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const attributes_model_1 = require("./attributes.model");
const product_model_1 = require("./product.model");
const AttributeValuea_model_1 = require("./AttributeValuea.model");
const CategoryProduct_model_1 = require("../filters/CategoryProduct.model");
const AttributeProduct_model_1 = require("./AttributeProduct.model");
const tag_model_1 = require("../filters/tag.model");
const TagProduct_model_1 = require("../filters/TagProduct.model");
const sequelize_2 = require("sequelize");
const category_model_1 = require("../filters/category.model");
const files_service_1 = require("../files/files.service");
const gallery_model_1 = require("./gallery.model");
const preview_model_1 = require("./preview.model");
const group_model_1 = require("../filters/group.model");
const variations_model_1 = require("./variations.model");
const recommendationProduct_model_1 = require("./recommendationProduct.model");
let ProductsService = class ProductsService {
    constructor(attr, product, attrValue, attrProduct, vars, cat_pr, tagProduct, cats, gallery, preview, recs, fileService) {
        this.attr = attr;
        this.product = product;
        this.attrValue = attrValue;
        this.attrProduct = attrProduct;
        this.vars = vars;
        this.cat_pr = cat_pr;
        this.tagProduct = tagProduct;
        this.cats = cats;
        this.gallery = gallery;
        this.preview = preview;
        this.recs = recs;
        this.fileService = fileService;
    }
    async createAttribute(dto) {
        if (dto.attributeName != undefined && dto.attributeName.length > 0) {
            const attribute = await this.attr.findOne({ where: { attributeName: dto.attributeName } });
            if (!attribute) {
                return await this.attr.create(dto);
            }
            throw new common_1.HttpException("Аттрибут с таким названием уже есть", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            throw new common_1.HttpException("Название атрибута не должно быть пустым", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async renameAttribute(dto) {
        if (dto.attributeValue != undefined && dto.attributeValue.length > 0) {
            try {
                return await this.attr.update({
                    attributeName: dto.attributeValue
                }, {
                    where: {
                        id: dto.attributeValueId
                    }
                });
            }
            catch (error) {
                throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException("Название атрибута не должно быть пустым", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAttribute(id) {
        const attribute = await this.attr.findOne({
            where: {
                id: { [sequelize_2.Op.or]: id }
            }
        });
        if (attribute) {
            await this.attrValue.destroy({ where: { attributeId: id } });
            return await this.attr.destroy({ where: { id } });
        }
        else {
            throw new common_1.HttpException("Такого атрибута нет", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createAttributeValue(dto) {
        if (dto.attributeValue != undefined && dto.attributeValue.length > 0) {
            try {
                return await this.attrValue.create({ attributeValue: dto.attributeValue, attributeId: dto.attributeId });
            }
            catch (error) {
                throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException("Значение атрибута не должно быть пустым", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async renameAttributeValue(dto) {
        if (dto.attributeValue != undefined && dto.attributeValue.length > 0) {
            try {
                return await this.attrValue.update({
                    attributeValue: dto.attributeValue
                }, {
                    where: {
                        id: dto.attributeValueId
                    }
                });
            }
            catch (error) {
                throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException("Значение атрибута не должно быть пустым", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAttributeValue(id) {
        const attrVal = await this.attrValue.findOne({ where: { id } });
        if (attrVal) {
            return await this.attrValue.destroy({ where: { id } });
        }
        else {
            throw new common_1.HttpException("Такого значения аттрибута нет", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProductCountPages(pars) {
        const limit = pars['limit'];
        let count = 0;
        let price = null;
        if (pars['search'] == 'null') {
            if (pars['price'] == 'desc') {
                price = 'desc';
            }
            else {
                if (pars['price'] == 'asc')
                    price = 'asc';
                else
                    price = null;
            }
            let rating = null;
            if (pars['rating'] == 'desc') {
                rating = 'desc';
            }
            else {
                if (pars['rating'] == 'asc')
                    rating = 'asc';
                else
                    rating = null;
            }
            if (rating && !price) {
                count = await this.product.count({
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            if (!rating && price) {
                count = await this.product.count({
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            if (rating && price) {
                count = await this.product.count({
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            count = await this.product.count({
                include: {
                    model: preview_model_1.Previews,
                    attributes: ['title']
                },
            });
            return Math.floor(count / limit) + 1;
        }
        else {
            let search = pars['search'];
            if (search[0] == "$") {
                let copy = search;
                let sArr = copy.split('');
                sArr.shift();
                let str = sArr.join("");
                const products = await this.product.count({
                    include: [{
                            model: tag_model_1.Tag,
                            where: {
                                tagTitle: {
                                    [sequelize_2.Op.startsWith]: str
                                }
                            },
                        },
                        {
                            model: preview_model_1.Previews
                        }]
                });
                return Math.floor(products / limit) + 1;
            }
            else {
                const products = await this.product.count({
                    where: { productName: {
                            [sequelize_2.Op.startsWith]: search
                        }
                    },
                    include: {
                        model: preview_model_1.Previews
                    }
                });
                return Math.floor(products / limit) + 1;
            }
        }
    }
    async createProduct(dto, images) {
        try {
            const product = await this.product.create(dto);
            if (images.length > 0) {
                const mean_img = await this.fileService.createFile(images[0]);
                const preview = await this.preview.create({ title: mean_img, productId: product.id });
            }
            if (JSON.parse(dto.categories).length > 0) {
                for (const cat of JSON.parse(dto.categories)) {
                    await this.cat_pr.create({ productId: product.id, categoryId: cat });
                }
            }
            if (JSON.parse(dto.attributes).length > 0) {
                for (const attr of JSON.parse(dto.attributes)) {
                    await this.attrProduct.create({ productId: product.id, attributeValueId: attr });
                }
            }
            if (JSON.parse(dto.vars).length > 0) {
                for (const v of JSON.parse(dto.vars)) {
                    await this.vars.create({ productId: product.id, attributeValueId: v });
                }
            }
            if (JSON.parse(dto.tags).length > 0) {
                for (const t of JSON.parse(dto.tags)) {
                    await this.tagProduct.create({ tagId: t, productId: product.id });
                }
            }
            if (JSON.parse(dto.recommendations).length > 0) {
                for (const t of JSON.parse(dto.recommendations)) {
                    await this.recs.create({ productRecId: product.id, productId: t });
                }
            }
            return product;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createGalleryProduct(images, dto) {
        for (let i = 0; i < images.length; i++) {
            const imgTitle = await this.fileService.createFile(images[i]);
            const img = await this.gallery.create({ title: imgTitle, productId: dto['id'] });
        }
    }
    async redactProduct(dto, images) {
        if (dto['productName'].length > 0 && dto['title'].length > 0) {
            const product = await this.product.findOne({
                where: { id: dto['id'] },
                include: [
                    { model: preview_model_1.Previews }
                ]
            });
            if (product) {
                if (images.length > 0) {
                    if (product.previews.length == 0 && dto['previews'].length != 0) {
                        const mean_img = await this.fileService.createFile(images[0]);
                        const preview = await this.preview.create({ title: mean_img, productId: product.id });
                    }
                    else {
                        if (product.previews.length == 1) {
                            if (product.previews[0].title != dto['previews']) {
                                const mean_img = await this.fileService.createFile(images[0]);
                                const preview = await this.preview.update({ title: mean_img }, { where: { productId: product.id } });
                            }
                        }
                    }
                }
                const r = await this.product.update({
                    productName: dto['productName'],
                    title: dto['title'],
                    description: dto['description'],
                    price: dto['price'],
                    sale_price: dto['sale_price'],
                }, { where: { id: dto['id'] } });
                if (dto['categories'] != undefined) {
                    await this.cat_pr.destroy({ where: { productId: product.id } });
                    for (const cat of JSON.parse(dto['categories'])) {
                        try {
                            await this.cat_pr.create({ productId: product.id, categoryId: cat });
                        }
                        catch (error) {
                            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                if (dto['vars'] != undefined) {
                    await this.vars.destroy({ where: { productId: product.id } });
                    for (const v of JSON.parse(dto['vars'])) {
                        try {
                            await this.vars.create({ productId: product.id, attributeValueId: v });
                        }
                        catch (error) {
                            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                if (dto['attributes'] != undefined) {
                    await this.attrProduct.destroy({ where: { productId: product.id } });
                    for (const attr of JSON.parse(dto['attributes'])) {
                        try {
                            await this.attrProduct.create({ productId: product.id, attributeValueId: attr });
                        }
                        catch (error) {
                            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                if (dto['tags'] != undefined) {
                    await this.tagProduct.destroy({ where: { productId: product.id } });
                    for (const t of JSON.parse(dto['tags'])) {
                        try {
                            await this.tagProduct.create({ tagId: t, productId: product.id });
                        }
                        catch (error) {
                            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                if (dto['recommendations'] != undefined) {
                    await this.recs.destroy({ where: { productRecId: product.id } });
                    for (const t of JSON.parse(dto['recommendations'])) {
                        try {
                            await this.recs.create({ productId: t, productRecId: product.id });
                        }
                        catch (error) {
                            throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                return true;
            }
            throw new common_1.HttpException("Такого товара не сущетсвует", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            throw new common_1.HttpException("Имя и краткое описание товара не должны быть пустыт", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateGalleryProduct(images, dto) {
        const product = await this.product.findOne({
            where: { id: Number(dto['id']) },
            include: [
                { model: gallery_model_1.Gallery }
            ]
        });
        if (images.length == 0) {
            if (product.gallery.length > JSON.parse(dto['gallery']).length) {
                const data = JSON.parse(dto['gallery']).map(v => { return v.split('/')[3]; });
                await this.gallery.destroy({ where: {
                        title: {
                            [sequelize_2.Op.notIn]: data
                        },
                        productId: product.id
                    } });
            }
        }
        else {
            const def = [];
            let c = 0;
            for (let elem of JSON.parse(dto['gallery'])) {
                const t = elem.split(':');
                if (t[0] != 'blob') {
                    def.push(t[2].split('/')[1]);
                }
            }
            await this.gallery.destroy({ where: {
                    title: {
                        [sequelize_2.Op.notIn]: def
                    },
                    productId: product.id
                } });
            for (let elem of JSON.parse(dto['gallery'])) {
                const t = elem.split(':');
                if (t[0] == 'blob' && t[1] == 'http' && t[2] == '//localhost') {
                    const mean_img = await this.fileService.createFile(images[c]);
                    const preview = await this.gallery.create({ title: mean_img, productId: product.id });
                    c++;
                }
            }
        }
        return true;
    }
    async deleteProduct(id) {
        const product = await this.product.findOne({ where: { id } });
        if (product) {
            await this.tagProduct.destroy({
                where: {
                    productId: id
                }
            });
            await this.cat_pr.destroy({
                where: {
                    productId: id
                }
            });
            await this.attrProduct.destroy({
                where: {
                    productId: id
                }
            });
            await this.gallery.destroy({
                where: {
                    productId: id
                }
            });
            await this.preview.destroy({
                where: {
                    productId: id
                }
            });
            await this.vars.destroy({
                where: {
                    productId: id
                }
            });
            await this.product.destroy({ where: { id } });
            return true;
        }
        else {
            throw new common_1.HttpException("Такого товара не существует", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProducts(pars) {
        const page = Number(pars['page']);
        const limit = Number(pars['limit']);
        let price = null;
        if (pars['search'] == 'null') {
            if (pars['price'] == 'desc') {
                price = 'desc';
            }
            else {
                if (pars['price'] == 'asc')
                    price = 'asc';
                else
                    price = null;
            }
            let rating = null;
            if (pars['rating'] == 'desc') {
                rating = 'desc';
            }
            else {
                if (pars['rating'] == 'asc')
                    rating = 'asc';
                else
                    rating = null;
            }
            if (rating && !price) {
                return await this.product.findAll({
                    offset: limit * page,
                    limit,
                    order: [
                        ['rating', rating]
                    ],
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            if (!rating && price) {
                return await this.product.findAll({
                    offset: limit * page,
                    limit,
                    order: [
                        ['price', price]
                    ],
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            if (rating && price) {
                return await this.product.findAll({
                    offset: limit * page,
                    limit,
                    order: [
                        ['price', price],
                        ['rating', rating]
                    ],
                    include: {
                        model: preview_model_1.Previews,
                        attributes: ['title']
                    }
                });
            }
            return await this.product.findAll({
                offset: limit * page,
                limit,
                include: {
                    model: preview_model_1.Previews,
                    attributes: ['title']
                },
                order: [
                    ['id', 'desc']
                ]
            });
        }
        else {
            let search = pars['search'];
            if (search[0] == "$") {
                let copy = search;
                let sArr = copy.split('');
                sArr.shift();
                let str = sArr.join("");
                const products = await this.product.findAll({
                    include: [{
                            model: tag_model_1.Tag,
                            where: {
                                tagTitle: {
                                    [sequelize_2.Op.startsWith]: str
                                }
                            },
                        },
                        {
                            model: preview_model_1.Previews
                        }],
                    order: [['id', 'desc']]
                });
                return products;
            }
            else {
                const products = await this.product.findAll({
                    where: { productName: {
                            [sequelize_2.Op.startsWith]: search
                        }
                    },
                    order: [['id', 'desc']],
                    include: {
                        model: preview_model_1.Previews
                    }
                });
                return products;
            }
        }
    }
    async getProduct(id) {
        try {
            const res = await this.product.findOne({
                where: {
                    id
                },
                include: [
                    { model: tag_model_1.Tag },
                    { model: preview_model_1.Previews },
                    { model: gallery_model_1.Gallery }
                ]
            });
            const u = await this.cats.findAll({
                attributes: ['id'],
                include: [
                    { model: product_model_1.Product,
                        where: { id } }
                ]
            });
            const u2 = await this.attrValue.findAll({
                attributes: ['id'],
                include: [
                    { model: product_model_1.Product,
                        where: { id } }
                ]
            });
            const cs = await this.cats.findAll({
                where: { id: u.map(v => { return v.id; }) },
                include: [
                    { model: group_model_1.Group }
                ]
            });
            const ats = await this.attr.findAll({
                where: { id: u2.map(v => { return v.id; }) },
                include: [
                    { model: AttributeValuea_model_1.AttributeValue }
                ]
            });
            const variations = await this.attr.findOne({
                include: [
                    {
                        model: AttributeValuea_model_1.AttributeValue,
                        include: [{
                                model: variations_model_1.Variations,
                                where: {
                                    productId: id
                                }
                            }]
                    }
                ]
            });
            const recommendations = await this.product.findAll({
                include: [
                    {
                        model: recommendationProduct_model_1.RecommendationProducts,
                        required: true,
                        where: { productRecId: id }
                    },
                    { model: preview_model_1.Previews }
                ]
            });
            return { res, cs, ats, variations, recommendations };
        }
        catch (error) {
            throw error;
        }
    }
    async getPhotos() {
        return await this.gallery.findAll({ attributes: ['title'] });
    }
    async getAttributes(page, limit = 6) {
        return this.attr.findAll({
            limit,
            offset: page * limit
        });
    }
    async getCountAttributesPages() {
        return Math.floor((await this.attr.count() / 6)) + 1;
    }
    async getAttributesValues(id, page, limit = 6) {
        return this.attrValue.findAll({
            where: {
                attributeId: id
            },
            limit,
            offset: page * limit,
            order: [['id', 'desc']]
        });
    }
    async getCountAttributeValuesPages(attributeId) {
        return Math.floor((await this.attrValue.count({ where: { attributeId } }) / 6)) + 1;
    }
    async getProductsCats(params) {
        try {
            let orders = [];
            if (params['price'] == 'asc') {
                orders.push(['price', 'asc']);
            }
            if (params['price'] == 'desc') {
                orders.push(['price', 'desc']);
            }
            if (params['rating'] == 'asc') {
                orders.push(['rating', 'asc']);
            }
            if (params['rating'] == 'desc') {
                orders.push(['rating', 'desc']);
            }
            if (params['order'] == 'asc') {
                orders.push(['id', 'asc']);
            }
            if (params['order'] == 'desc') {
                orders.push(['id', 'desc']);
            }
            const res = await this.product.findAll({
                offset: Number(params['offset']),
                limit: Number(params['limit']),
                include: [
                    { model: preview_model_1.Previews },
                    { model: gallery_model_1.Gallery },
                    {
                        model: category_model_1.Category,
                        where: {
                            id: Number(params['idCategory'])
                        }
                    }
                ],
                order: orders
            });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getProductsDef(params) {
        try {
            let orders = [];
            if (params['search'] == 'null') {
                if (params['price'] == 'asc') {
                    orders.push(['price', 'asc']);
                }
                if (params['price'] == 'desc') {
                    orders.push(['price', 'desc']);
                }
                if (params['rating'] == 'asc') {
                    orders.push(['rating', 'asc']);
                }
                if (params['rating'] == 'desc') {
                    orders.push(['rating', 'desc']);
                }
                if (params['order'] == 'asc') {
                    orders.push(['id', 'asc']);
                }
                if (params['order'] == 'desc') {
                    orders.push(['id', 'desc']);
                }
                const res = await this.product.findAll({
                    offset: Number(params['offset']),
                    limit: Number(params['limit']),
                    order: orders,
                    include: [
                        { model: preview_model_1.Previews }
                    ]
                });
                return res;
            }
            else {
                let search = params['search'];
                if (search[0] == "$") {
                    let copy = search;
                    let sArr = copy.split('');
                    sArr.shift();
                    let str = sArr.join("");
                    const products = await this.product.findAll({
                        include: [{
                                model: tag_model_1.Tag,
                                where: {
                                    tagTitle: {
                                        [sequelize_2.Op.startsWith]: str
                                    }
                                },
                            },
                            {
                                model: preview_model_1.Previews
                            }],
                        order: [['id', 'desc']]
                    });
                    return products;
                }
                else {
                    const products = await this.product.findAll({
                        where: { productName: {
                                [sequelize_2.Op.startsWith]: search
                            }
                        },
                        order: [['id', 'desc']],
                        include: {
                            model: preview_model_1.Previews
                        }
                    });
                    return products;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(attributes_model_1.Attribute)),
    __param(1, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(2, (0, sequelize_1.InjectModel)(AttributeValuea_model_1.AttributeValue)),
    __param(3, (0, sequelize_1.InjectModel)(AttributeProduct_model_1.AttributeProduct)),
    __param(4, (0, sequelize_1.InjectModel)(variations_model_1.Variations)),
    __param(5, (0, sequelize_1.InjectModel)(CategoryProduct_model_1.CategoryProduct)),
    __param(6, (0, sequelize_1.InjectModel)(TagProduct_model_1.TagProduct)),
    __param(7, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __param(8, (0, sequelize_1.InjectModel)(gallery_model_1.Gallery)),
    __param(9, (0, sequelize_1.InjectModel)(preview_model_1.Previews)),
    __param(10, (0, sequelize_1.InjectModel)(recommendationProduct_model_1.RecommendationProducts)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, files_service_1.FilesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map