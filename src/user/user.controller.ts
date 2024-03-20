import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService){

    }
    @UsePipes(ValidationPipe)
    @Post('/reg')
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body()loginDto: LoginDto){
        return this.usersService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/checkToken')
    checkToken(){
        return true
    }
    


}
