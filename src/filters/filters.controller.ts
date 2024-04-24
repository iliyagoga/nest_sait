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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.model';
import { Group } from './group.model';
import { Category } from './category.model';

@ApiTags('Фильтры')
@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService){}

    @ApiOperation({summary:'Создание тега'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createTag')
    createTag(@Body() dto: TagDto){
        return this.filtersService.createTag(dto);

    }

    @ApiOperation({summary:'Создание группы'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createGroup')
    createGroup(@Body() dto: GroupDto){
        return this.filtersService.createGroup(dto);

    }

    @ApiOperation({summary:'Создание категории'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createCategory')
    createCategory(@Body() dto: CategoryDto){
        return this.filtersService.createCategory(dto);

    }

    @ApiOperation({summary:'Удаление тега'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/removeTag')
    removeTag(@Body() data: RemoveTag){
        return this.filtersService.removeTag(data);

    }

    @ApiOperation({summary:'Редактирование тега'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/redactTag')
    redactTag(@Body() dto: TagRedact){
        return this.filtersService.redactTag(dto);

    }

    @ApiOperation({summary:'Удаление группы'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/removeGroup')
    removeGroup(@Body() ids: RemoveGroupDto){
        return this.filtersService.removeGroup(ids);

    }


    @ApiOperation({summary:'Переименование группы'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/renameGroup')
    renameGroup(@Body() dto: RenameGroupDto){
        return this.filtersService.renameGroup(dto);

    }

    @ApiOperation({summary:'Удаление категории'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/removeCategory')
    removeCategory(@Body() data: object){
        return this.filtersService.removeCategory(data);

    }

    @ApiOperation({summary:'Получение количества страниц категорий'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesCountPages/:id')
    getCategoriesCountPages(@Param('id') id: string){
        return this.filtersService.getCategoriesCountPages(Number(id));

    }

    @ApiOperation({summary:'Переименование категории'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/renameCategory')
    renameCategory(@Body() dto: RenameCategoryDto){
        return this.filtersService.renameCategory(dto);
    }

    @ApiOperation({summary:'Получение категорий в группе'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesByGroup/:id/:page')
    getCategoriesByGroup(@Param('id') id: string, @Param('page') page: string){
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page));
    }

    @ApiOperation({summary:'Получение категорий в группе (с фильтрами)'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCategoriesByGroup/:id/:page/:limit')
    getCategoriesByGroupLimit(@Param('id') id: string, @Param('page') page: string, @Param('limit') limit: string){
        return this.filtersService.getCategoriesByGroup(Number(id), Number(page), Number(limit));
    }

    
    @ApiOperation({summary:'Получение тегов'})
    @ApiResponse({status: 200, type: Tag})
    @Get('/getTags')
    getTags(){
        return this.filtersService.getTags();
    }

    
    @ApiOperation({summary:'Получение тегов с счетчиком прикреплений к товарам'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCountTags/:num')
    getCountTags(@Param('num') num: string){
        return this.filtersService.getCountTags(Number(num));
    }

    
    @ApiOperation({summary:'Подсчет тегов'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/countTags')
    countTags(){
        return this.filtersService.countTags();
    }

    
    @ApiOperation({summary:'Получение групп (постранично)'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getGroups/:page')
    getGroups(@Param('page') page: string){
        return this.filtersService.getGroups(Number(page));
    }

    @ApiOperation({summary:'Получение групп (с фильтрами)'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getGroups/:page/:limit')
    getGroupsLimit(@Param('page') page: string, @Param('limit') limit: string){
        return this.filtersService.getGroups(Number(page), Number(limit));
    }

    @ApiOperation({summary:'Получение всех групп'})
    @ApiResponse({status: 200, type: Group})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getAllGroups')
    getAllGroups(){
        return this.filtersService.getAllGroups();
    }

    @ApiOperation({summary:'Получение количества страниц групп'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getGroupsCountPages')
    getGroupsCountPages(){
        return this.filtersService.countGroupsPages();
    }

    @ApiOperation({summary:'Получение групп (со стороны обычного клиента)'})
    @ApiResponse({status: 200, type: Group})
    @Get('/getGroupsClient')
    getGroupsClient(){
        return this.filtersService.getAllGroups()
    }

    @ApiOperation({summary:'Получение категорий (со стороны обычного клиента)'})
    @Get('/getCategoriesClient')
    getCategoriesClient(){
        return this.filtersService.getAllCategories()
    }

    





}
