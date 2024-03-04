import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/role/role.model';
import { User } from './user.model';
import { RolesUser } from 'src/role/RolesUser.model';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../role/roles.guard';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    SequelizeModule.forFeature([Role,User,RolesUser]),
    JwtModule.register({
    secret: process.env.PRIVATE_KEY || "SECRET",
    signOptions:{
      expiresIn: '24h'
    }
  }),
    RoleModule],
    exports:[UserModule]
})
export class UserModule {}
