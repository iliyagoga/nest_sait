import { Body, Controller, Get, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService){}
    @Get("/:value")
    getRoleByValue(@Param('value') id: string){
        return this.roleService.getRoleByValue(id);
    }

    @UsePipes(ValidationPipe)

    @Post('/checkRole')
    @UseGuards(JwtAuthGuard)
    checkRole(@Headers() headers: object){
        return this.roleService.checkRole(headers);
    }


    // @Post()
    // @UsePipes(ValidationPipe)
    // createRole(@Body() res: CreateRoleDto){
    //     return this.roleService.createRole(res)
    // }
}
