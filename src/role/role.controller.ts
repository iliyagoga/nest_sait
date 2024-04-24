import { Body, Controller, Get, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles-auth.decoration';
import { Role } from './role.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService){}

    @ApiOperation({summary:'Получение роли (фиктивно)'})
    @ApiResponse({status: 200, type: Role})
    @Get("/:value")
    getRoleByValue(@Param('value') id: string){
        return this.roleService.getRoleByValue(id);
    }


    @ApiOperation({summary:'Проверка юзера на роль'})
    @ApiResponse({status: 200, type: Boolean})
    @UsePipes(ValidationPipe)
    @Post('/checkRole')
    @UseGuards(JwtAuthGuard)
    checkRole(@Headers() headers: object){
        return this.roleService.checkRole(headers);
    }

    @ApiOperation({summary:'Создание администратора'})
    @ApiResponse({status: 200, type: Boolean})
    @UseGuards(RolesGuard)
    @Roles('SUPERUSER')
    @UseGuards(JwtAuthGuard)
    @Post('/createAdmin')
    createAdmin(@Body('email') email: string){
        return this.roleService.createAdmin(email)
    }

    @ApiOperation({summary:'Удаление администратора'})
    @ApiResponse({status: 200, type: Boolean})
    @UseGuards(RolesGuard)
    @Roles('SUPERUSER')
    @UseGuards(JwtAuthGuard)
    @Post('/deleteAdmin')
    deleteAdmin(@Body('email') email: string){
        return this.roleService.deleteAdmin(email)
    }


    // @Post()
    // @UsePipes(ValidationPipe)
    // createRole(@Body() res: CreateRoleDto){
    //     return this.roleService.createRole(res)
    // }
}
