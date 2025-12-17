import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { User } from 'src/user/user.model';
import { RolesUser } from './RolesUser.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    SequelizeModule.forFeature([Role,User,RolesUser]),
  ],
  controllers: [RoleController],
  providers: [RoleService,JwtService],
  exports:[RoleService]
})
export class RoleModule {


}
