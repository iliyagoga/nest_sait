import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { TagDto } from './dto/tag.dto';
import { Group } from './group.model';
import { GroupDto } from './dto/group.dto';
import { Category } from './category.model';
import { CategoryDto } from './dto/category.dto';
import { TagRedact } from './dto/tag-redact.dto';
import { RenameGroupDto } from './dto/rename-group.dto';
import { RenameCategoryDto } from './dto/rename-category.dto';
import sequelize from 'sequelize';
import { RemoveTag } from './dto/removeTag.dto';
import { Op } from 'sequelize';
import { RemoveGroupDto } from './dto/removeGroup.dto';

@Injectable()
export class FiltersService {

    constructor(@InjectModel(Tag) private tag: typeof Tag,
    @InjectModel(Group) private group: typeof Group,
    @InjectModel(Category) private category: typeof Category){}

    async createTag(dto: TagDto){
        try {
            const t = await this.tag.findOne({where:{tagTitle: dto. tagTitle}})
        if(!t){
            return await this.tag.create(dto);
        }
        throw new HttpException("Такой тег уже существует", HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw new HttpException("Такой тег уже существует", HttpStatus.BAD_REQUEST);
        }
        
    }
    async removeTag(body: RemoveTag){
        return await this.tag.destroy({where:{id: body.tags }});
    }

    async redactTag(dto: TagRedact){
        try {
           const t = await this.tag.update({tagTitle:dto.tagTitle},{where:{id: dto.id}});
           return t;
        } catch (error) {
            throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
        }
        
    }

    async getTags(){
        return await this.tag.findAll({order:[['id','desc']]});
    }

    async countTags(){
        return Math.floor(await this.tag.count()/6)+1
    }

    async getCountTags(num=0){
        return await this.tag.findAll(
            {
                offset: 6*num,
                attributes:{
                    include:[
                        [
                            sequelize.literal(`(
                            SELECT COUNT(*) 
                                FROM "TagProduct"
                                WHERE "Tag"."id"= "TagProduct"."tagId")`),
                            'countTag'
                        ]
                    ]
                },
                limit: 6,
                order:[['id','desc']]
            }
        );
    }

    
    async createGroup(dto: GroupDto){
        const t = await this.group.findOne({where:{groupTitle: dto.groupTitle}})
        if(!t){
            return await this.group.create(dto);
        }
        throw new HttpException("Такая группа уже существует", HttpStatus.BAD_REQUEST);
    }

    async createCategory(dto: CategoryDto){
        const c = await this.category.findOne({where:{categoryName: dto.categoryName}})
        const g = await this.group.findOne({where:{id: dto.groupId}})
        if(!c && g){
            return await this.category.create(dto);
        }
        throw new HttpException("Такая категория уже существует уже существует или группы, прикрепленной к категории, не существует", HttpStatus.BAD_REQUEST);
    }


    async removeGroup(ids: RemoveGroupDto){
        const t = await this.group.findAll(
            {
                where:{
                    id: ids.ids
                    }
                });
        if(t){
            try {
                await this.category.destroy({
                    where:{
                        groupId: ids.ids
                        
                    }
                });
                await this.group.destroy(
                {
                    where:{
                            id: ids.ids
                            }
                            
                        });
                return true;
            } catch (error) {
                throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
            }  
        
        }
        throw new HttpException("Такой группы нет", HttpStatus.BAD_REQUEST);
    }

    async renameGroup(dto : RenameGroupDto){
        const t = this.group.findOne({where:{id: dto.id}})
        if(t){
            
            return await this.group.update({groupTitle: dto.groupTitle},{where:{id: dto.id}});
        }
        throw new HttpException("Такой группы не существует", HttpStatus.BAD_REQUEST);
    }

    async removeCategory(data: object){
        const t = await this.category.destroy({where:{id: data['id']}})
        return t;
    }

    async renameCategory(dto : RenameCategoryDto){
        const t = await this.category.findOne({where:{id: dto.id}})
        if(t){
            
            return await this.category.update({categoryName: dto.categoryName},{where:{id: dto.id}});
        }
        throw new HttpException("Такой категории не существует", HttpStatus.BAD_REQUEST);
    }

    async getCategoriesCountPages(id: number){
        return Math.floor(await this.category.count({
            where:{
                groupId: id
            }
        })/6)+1
    }

    async getCategoriesByGroup(id: number, page:number, limit: number = 6){
        return await this.category.findAll({
            limit,
            offset: page* limit,
            where:{
                groupId: id
            },
            order:[
                ['id', 'desc']
            ]
        })
    }

    async getGroups(page: number, limit: number=6){
        return await this.group.findAll({
            limit,
            offset: page*limit,
            order:[
                ['id', 'desc']
            ]
        })
    }

    async getAllGroups(){
        return await this.group.findAll({
          
            order:[
                ['id', 'desc']
            ]
        })
    }

    async countGroupsPages(){
        return Math.floor(await this.group.count()/6)+1
    }

    async getAllCategories(){
        const res = await this.group.findAll({
            include:{
                model: Category
            }
        })
        return res
    }

    


}
