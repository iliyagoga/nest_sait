import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { FiltersService } from './filters.service';
import { CategoryDto } from './dto/category.dto';
import { GroupDto } from './dto/group.dto';
import { TagRedact } from './dto/tag-redact.dto';
import { RenameGroupDto } from './dto/rename-group.dto';
import { RenameCategoryDto } from './dto/rename-category.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Roles } from 'src/role/roles-auth.decoration';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { RemoveTag } from './dto/removeTag.dto';
import { RemoveGroupDto } from './dto/removeGroup.dto';

@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService,
        private jwtServise:  JwtService){}

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/createTag')
    createTag(@Body() dto: TagDto){
        return this.filtersService.createTag(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/createGroup')
    createGroup(@Body() dto: GroupDto){
        return this.filtersService.createGroup(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/createCategory')
    createCategory(@Body() dto: CategoryDto){
        return this.filtersService.createCategory(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/removeTag')
    removeTag(@Body() data: RemoveTag){
        return this.filtersService.removeTag(data);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/redactTag')
    redactTag(@Body() dto: TagRedact){
        return this.filtersService.redactTag(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/removeGroup')
    removeGroup(@Body() ids: RemoveGroupDto){
        return this.filtersService.removeGroup(ids);

    }


    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/renameGroup')
    renameGroup(@Body() dto: RenameGroupDto){
        return this.filtersService.renameGroup(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/removeCategory')
    removeCategory(@Body() data: object){
        return this.filtersService.removeCategory(data);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesCountPages/:id')
    getCategoriesCountPages(@Param('id') id: string){
        return this.filtersService.getCategoriesCountPages(Number(id));

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/renameCategory')
    renameCategory(@Body() dto: RenameCategoryDto){
        return this.filtersService.renameCategory(dto);
    }
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesByGroup/:id/:page')
    getCategoriesByGroup(@Param('id') id: string, @Param('page') page: string){
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page));
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesByGroup/:id/:page/:limit')
    getCategoriesByGroupLimit(@Param('id') id: string, @Param('page') page: string, @Param('limit') limit: string){
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page), Number(limit));
    }

    @Get('/getTags')
    getTags(){
        return this.filtersService.getTags();
    }
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCountTags/:num')
    getCountTags(@Param('num') num: string){
        return this.filtersService.getCountTags(Number(num));
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/countTags')
    countTags(){
        return this.filtersService.countTags();
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getGroups/:page')
    getGroups(@Param('page') page: string){
        return this.filtersService.getGroups(Number(page));
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getGroups/:page/:limit')
    getGroupsLimit(@Param('page') page: string, @Param('limit') limit: string){
        return this.filtersService.getGroups(Number(page), Number(limit));
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getAllGroups')
    getAllGroups(){
        return this.filtersService.getAllGroups();
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getGroupsCountPages')
    getGroupsCountPages(){
        return this.filtersService.countGroupsPages();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getGroupsClient')
    getGroupsClient(){
        return this.filtersService.getAllGroups()
    }

    





}
