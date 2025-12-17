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
exports.FiltersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tag_model_1 = require("./tag.model");
const group_model_1 = require("./group.model");
const category_model_1 = require("./category.model");
const sequelize_2 = require("sequelize");
const sequelize_3 = require("sequelize");
let FiltersService = class FiltersService {
    constructor(tag, group, category) {
        this.tag = tag;
        this.group = group;
        this.category = category;
    }
    async createTag(dto) {
        try {
            if (dto.tagTitle != undefined && dto.tagTitle.length > 0) {
                const t = await this.tag.findOne({ where: { tagTitle: dto.tagTitle } });
                if (!t) {
                    return await this.tag.create(dto);
                }
                throw new common_1.HttpException("Такой тег уже существует", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException("Имя тега не должно быть пустым", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async removeTag(body) {
        try {
            const res = await this.tag.findOne({ where: { id: body.tags } });
            if (res) {
                return await this.tag.destroy({ where: { id: body.tags } });
            }
            throw new common_1.HttpException('Такого тега нет', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw error;
        }
    }
    async redactTag(dto) {
        try {
            if (dto.tagTitle != undefined && dto.tagTitle.length > 0) {
                const t = await this.tag.findOne({ where: { tagTitle: dto.tagTitle, id: { [sequelize_3.Op.not]: dto.id } } });
                if (!t) {
                    return await this.tag.update({ tagTitle: dto.tagTitle }, { where: { id: dto.id } });
                }
                throw new common_1.HttpException("Такой тег уже существует", common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Имя тега не должно быть пустым', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getTags() {
        return await this.tag.findAll({ order: [['id', 'desc']] });
    }
    async countTags() {
        return Math.floor(await this.tag.count() / 6) + 1;
    }
    async getCountTags(num = 0) {
        return await this.tag.findAll({
            offset: 6 * num,
            attributes: {
                include: [
                    [
                        sequelize_2.default.literal(`(
                            SELECT COUNT(*) 
                                FROM "TagProduct"
                                WHERE "Tag"."id"= "TagProduct"."tagId")`),
                        'countTag'
                    ]
                ]
            },
            limit: 6,
            order: [['id', 'desc']]
        });
    }
    async createGroup(dto) {
        if (dto.groupTitle != undefined) {
            const t = await this.group.findOne({ where: { groupTitle: dto.groupTitle } });
            if (!t) {
                return await this.group.create(dto);
            }
            throw new common_1.HttpException("Такая группа уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            throw new common_1.HttpException('Укажите имя группы', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createCategory(dto) {
        if (dto.categoryName != undefined) {
            const c = await this.category.findOne({ where: { categoryName: dto.categoryName } });
            const g = await this.group.findOne({ where: { id: dto.groupId } });
            if (!c && g) {
                return await this.category.create(dto);
            }
            throw new common_1.HttpException("Такая категория уже существует уже существует или группы, прикрепленной к категории, не существует", common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            throw new common_1.HttpException('Укажите имя категории', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeGroup(ids) {
        const t = await this.group.findOne({
            where: {
                id: ids.ids
            }
        });
        if (t) {
            try {
                await this.category.destroy({
                    where: {
                        groupId: ids.ids
                    }
                });
                await this.group.destroy({
                    where: {
                        id: ids.ids
                    }
                });
                return true;
            }
            catch (error) {
                throw new common_1.HttpException(error.name, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        throw new common_1.HttpException("Такой группы нет", common_1.HttpStatus.BAD_REQUEST);
    }
    async renameGroup(dto) {
        const t = this.group.findOne({ where: { id: dto.id } });
        if (t) {
            if (dto.groupTitle.length > 0) {
                return await this.group.update({ groupTitle: dto.groupTitle }, { where: { id: dto.id } });
            }
            else {
                throw new common_1.HttpException("Укажите имя группы", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        throw new common_1.HttpException("Такой группы не существует", common_1.HttpStatus.BAD_REQUEST);
    }
    async removeCategory(data) {
        const t = await this.category.destroy({ where: { id: data['id'] } });
        return t;
    }
    async renameCategory(dto) {
        const t = await this.category.findOne({ where: { id: dto.id } });
        if (t) {
            if (dto.categoryName.length > 0) {
                return await this.category.update({ categoryName: dto.categoryName }, { where: { id: dto.id } });
            }
            else {
                throw new common_1.HttpException("Укажите имя категории", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        throw new common_1.HttpException("Такой категории не существует", common_1.HttpStatus.BAD_REQUEST);
    }
    async getCategoriesCountPages(id) {
        return Math.floor(await this.category.count({
            where: {
                groupId: id
            }
        }) / 6) + 1;
    }
    async getCategoriesByGroup(id, page, limit = 6) {
        return await this.category.findAll({
            limit,
            offset: page * limit,
            where: {
                groupId: id
            },
            order: [
                ['id', 'desc']
            ]
        });
    }
    async getGroups(page, limit = 6) {
        return await this.group.findAll({
            limit,
            offset: page * limit,
            order: [
                ['id', 'desc']
            ]
        });
    }
    async getAllGroups() {
        return await this.group.findAll({
            order: [
                ['id', 'desc']
            ]
        });
    }
    async countGroupsPages() {
        return Math.floor(await this.group.count() / 6) + 1;
    }
    async getAllCategories() {
        const res = await this.group.findAll({
            include: {
                model: category_model_1.Category
            }
        });
        return res;
    }
};
exports.FiltersService = FiltersService;
exports.FiltersService = FiltersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tag_model_1.Tag)),
    __param(1, (0, sequelize_1.InjectModel)(group_model_1.Group)),
    __param(2, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object, Object, Object])
], FiltersService);
//# sourceMappingURL=filters.service.js.map