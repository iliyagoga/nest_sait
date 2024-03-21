import { Body, Controller, Header, Headers, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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
    checkToken(@Headers('authorization') hs: string){
        return this.usersService.getUser(hs)
        
    }

    @UseGuards(JwtAuthGuard)
    @Post('/updateUser')
    @UseInterceptors(FileInterceptor('avatar'))
    updateUser(@UploadedFile() avatar: Blob, @Body() formdata: FormData,@Headers('authorization') hs: string){
        return this.usersService.updateUser(formdata,avatar,hs)
        
    }
    


}
