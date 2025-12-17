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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const Order_dto_1 = require("./dto/Order.dto");
const validation_pipe_1 = require("../pipes/validation.pipe");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
const roles_guard_1 = require("../role/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const order_model_1 = require("./order.model");
let OrderController = class OrderController {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    createOrder(auth, body) {
        return this.orderRepository.createOrder(auth, body);
    }
    getOrders(page, limit, vars) {
        return this.orderRepository.getOrders(page, limit, vars);
    }
    getCountPages(limit) {
        return this.orderRepository.getCountPages(limit);
    }
    updateStatus(id, orderStatus) {
        return this.orderRepository.updateStatus(id, orderStatus);
    }
    getOrder(id) {
        return this.orderRepository.getOrder(id);
    }
    removeOrders(ids) {
        return this.orderRepository.deleteOrders(ids);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание заказа' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: order_model_1.Order }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/createOrder'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Order_dto_1.OrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка заказов (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: order_model_1.Order }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getOrders/:page/:limit/:vars'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __param(2, (0, common_1.Param)('vars')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц (c limit строк на 1 странице)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCountPages/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getCountPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение статуса заказа' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: order_model_1.Order }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/updateStatus'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('orderStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение информации по заказу' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: order_model_1.Order }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getOrder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление заказов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: order_model_1.Order }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/removeOrders'),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "removeOrders", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Заказы'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map