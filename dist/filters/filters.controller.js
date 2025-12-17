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
exports.FiltersController = void 0;
const common_1 = require("@nestjs/common");
const tag_dto_1 = require("./dto/tag.dto");
const filters_service_1 = require("./filters.service");
const category_dto_1 = require("./dto/category.dto");
const group_dto_1 = require("./dto/group.dto");
const tag_redact_dto_1 = require("./dto/tag-redact.dto");
const rename_group_dto_1 = require("./dto/rename-group.dto");
const rename_category_dto_1 = require("./dto/rename-category.dto");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
const roles_guard_1 = require("../role/roles.guard");
const removeTag_dto_1 = require("./dto/removeTag.dto");
const removeGroup_dto_1 = require("./dto/removeGroup.dto");
const swagger_1 = require("@nestjs/swagger");
const tag_model_1 = require("./tag.model");
const group_model_1 = require("./group.model");
const category_model_1 = require("./category.model");
let FiltersController = class FiltersController {
    constructor(filtersService) {
        this.filtersService = filtersService;
    }
    createTag(dto) {
        return this.filtersService.createTag(dto);
    }
    createGroup(dto) {
        return this.filtersService.createGroup(dto);
    }
    createCategory(dto) {
        return this.filtersService.createCategory(dto);
    }
    removeTag(data) {
        return this.filtersService.removeTag(data);
    }
    redactTag(dto) {
        return this.filtersService.redactTag(dto);
    }
    removeGroup(ids) {
        return this.filtersService.removeGroup(ids);
    }
    renameGroup(dto) {
        return this.filtersService.renameGroup(dto);
    }
    removeCategory(data) {
        return this.filtersService.removeCategory(data);
    }
    getCategoriesCountPages(id) {
        return this.filtersService.getCategoriesCountPages(Number(id));
    }
    renameCategory(dto) {
        return this.filtersService.renameCategory(dto);
    }
    getCategoriesByGroup(id, page) {
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page));
    }
    getCategoriesByGroupLimit(id, page, limit) {
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page), Number(limit));
    }
    getTags() {
        return this.filtersService.getTags();
    }
    getCountTags(num) {
        return this.filtersService.getCountTags(Number(num));
    }
    countTags() {
        return this.filtersService.countTags();
    }
    getGroups(page) {
        return this.filtersService.getGroups(Number(page));
    }
    getGroupsLimit(page, limit) {
        return this.filtersService.getGroups(Number(page), Number(limit));
    }
    getAllGroups() {
        return this.filtersService.getAllGroups();
    }
    getGroupsCountPages() {
        return this.filtersService.countGroupsPages();
    }
    getGroupsClient() {
        return this.filtersService.getAllGroups();
    }
    getCategoriesClient() {
        return this.filtersService.getAllCategories();
    }
};
exports.FiltersController = FiltersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание тега' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_model_1.Tag }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createTag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.TagDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "createTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание группы' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createGroup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_dto_1.GroupDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "createGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание категории' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createCategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "createCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление тега' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_model_1.Tag }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/removeTag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [removeTag_dto_1.RemoveTag]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "removeTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование тега' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_model_1.Tag }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/redactTag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_redact_dto_1.TagRedact]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "redactTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление группы' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/removeGroup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [removeGroup_dto_1.RemoveGroupDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "removeGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Переименование группы' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/renameGroup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rename_group_dto_1.RenameGroupDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "renameGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление категории' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/removeCategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "removeCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц категорий' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCategoriesCountPages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getCategoriesCountPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Переименование категории' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/renameCategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rename_category_dto_1.RenameCategoryDto]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "renameCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение категорий в группе' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCategoriesByGroup/:id/:page'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getCategoriesByGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение категорий в группе (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCategoriesByGroup/:id/:page/:limit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getCategoriesByGroupLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение тегов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_model_1.Tag }),
    (0, common_1.Get)('/getTags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение тегов с счетчиком прикреплений к товарам' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tag_model_1.Tag }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCountTags/:num'),
    __param(0, (0, common_1.Param)('num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getCountTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Подсчет тегов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/countTags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "countTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение групп (постранично)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getGroups/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение групп (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getGroups/:page/:limit'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getGroupsLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех групп' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getAllGroups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getAllGroups", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц групп' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getGroupsCountPages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getGroupsCountPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение групп (со стороны обычного клиента)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: group_model_1.Group }),
    (0, common_1.Get)('/getGroupsClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getGroupsClient", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение категорий (со стороны обычного клиента)' }),
    (0, common_1.Get)('/getCategoriesClient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FiltersController.prototype, "getCategoriesClient", null);
exports.FiltersController = FiltersController = __decorate([
    (0, swagger_1.ApiTags)('Фильтры'),
    (0, common_1.Controller)('filters'),
    __metadata("design:paramtypes", [filters_service_1.FiltersService])
], FiltersController);
//# sourceMappingURL=filters.controller.js.map