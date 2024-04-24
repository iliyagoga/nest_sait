import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AttributeDto } from './dto/attribute.dto';
import { ProductDto } from './dto/product.dto';
import { AttributeValueDto } from './dto/attributeValue.dto';
import { RedactProductDto } from './dto/redact-product.dto';
import { GetProduct } from './dto/getProduct.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RenameAttributeValue } from './dto/rename-attributeValue.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Attribute } from './attributes.model';
import { AttributeValue } from './AttributeValuea.model';
import { Product } from './product.model';
import { Gallery } from './gallery.model';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles-auth.decoration';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @ApiOperation({summary:'Создание атрибута'})
    @ApiResponse({status: 200, type: Attribute})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createAttribute')
    async createAttribute(@Body() dto: AttributeDto){
        return this.productService.createAttribute(dto);

    }

    @ApiOperation({summary:'Переименование атрибута'})
    @ApiResponse({status: 200, type: Attribute})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/renameAttribute')
    async renameAttribute(@Body() dto: RenameAttributeValue){
        return this.productService.renameAttribute(dto);

    }

    @ApiOperation({summary:'Удаление атрибута'})
    @ApiResponse({status: 200, type: Attribute})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/deleteAttribute')
    async deleteAttribute(@Body() body: object){
        return this.productService.deleteAttribute(body['id']);
    }

    @ApiOperation({summary:'Создание значения атрибута'})
    @ApiResponse({status: 200, type: AttributeValue})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createAttributeValue')
    async createAttributeValue(@Body() dto: AttributeValueDto){
        return this.productService.createAttributeValue(dto);

    }

    @ApiOperation({summary:'Удаление значения атрибута'})
    @ApiResponse({status: 200, type: AttributeValue})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/deleteAttributeValue')
    async deleteAttributeValue(@Body() body: object){
        return this.productService.deleteAttributeValue(body['id']);
    }

    @ApiOperation({summary:'Переименование значения атрибута'})
    @ApiResponse({status: 200, type: AttributeValue})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/renameAttributeValue')
    async renameAttributeValue(@Body() dto: RenameAttributeValue){
        return this.productService.renameAttributeValue(dto);
    }

    @ApiOperation({summary:'Создание товара'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/createProduct")
    async createProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        if(dto.productName.length>0 && dto.productName.length>0){
            return this.productService.createProduct(dto,images)
        }
        throw new HttpException("Имя и короткое описание продукта должны быть заполнены", HttpStatus.BAD_REQUEST)    }

    @ApiOperation({summary:'Создание галереи товара'})
    @ApiResponse({status: 200, type: Gallery})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/createGalleryProduct")
    async createGalleryProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
            return this.productService.createGalleryProduct(images,dto)
    }    

    @ApiOperation({summary:'Редактирование товара'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/redactProduct")
    async redactProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        return this.productService.redactProduct(dto, images);
    }

    @ApiOperation({summary:'Редактирование галереи товара'})
    @ApiResponse({status: 200, type: Gallery})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/updateGalleryProduct")
    async updateGalleryProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        return this.productService.updateGalleryProduct(images,dto)
    }

    @ApiOperation({summary:'Редактирование товара'})
    @ApiResponse({status: 200, type: Gallery})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post("/deleteProduct")
    async deleteProduct(@Body() data: object){
        return this.productService.deleteProduct(data["id"]);
    }

    @ApiOperation({summary:'Получение списка товаров (с фильтрами)'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getProducts/:page/:limit/:price/:rating/:search')
    async getProducts(@Param() pars: string[]){
        return this.productService.getProducts(pars);
    }

    @ApiOperation({summary:'Получение информации о товаре'})
    @ApiResponse({status: 200, type: Product})
    @Get('/getProduct/:id')
    async getProduct(@Param('id') id: string){
        return this.productService.getProduct(Number(id));
    }

    @ApiOperation({summary:'Получение изображений товара'})
    @ApiResponse({status: 200, type: Gallery})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getPhotos')
    async getPhotos(){
        return this.productService.getPhotos();
    }

    @ApiOperation({summary:'Получение количества страниц с строками товаров (с фильтрами)'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getProductCountPages/:limit/:price/:rating/:search')
    async getProductCountPages(@Param() pars: string[]){
        return this.productService.getProductCountPages(pars);
    }

    @ApiOperation({summary:'Получение списка атрибутов постранично'})
    @ApiResponse({status: 200, type: Attribute})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getAttributes/:num')
    async getAttributes(@Param('num') page: number){
        return this.productService.getAttributes(page)
    }

    
    @ApiOperation({summary:'Получение списка атрибутов постранично (c limit строк на странице)'})
    @ApiResponse({status: 200, type: Attribute})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getAttributes/:num/:limit')
    async getAttributesLimit(@Param('num') page: number, @Param('limit') limit: number){
        return this.productService.getAttributes(page,limit)
    }

    @ApiOperation({summary:'Получение количества страниц атрибутов'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCountAttributesPages')
    async getCountAttributesPages(){
        return this.productService.getCountAttributesPages()
    }

    @ApiOperation({summary:'Получение строк со сзначениями атрибутов (с фильтрами)'})
    @ApiResponse({status: 200, type: AttributeValue})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getAttributesValues/:id/:page')
    async getAttributesValues(@Param('id') id: number, @Param('page') page:number){
        return this.productService.getAttributesValues(id,page)
    }

    @ApiOperation({summary:'Получение строк со сзначениями атрибутов (с фильтрами и limit)'})
    @ApiResponse({status: 200, type: AttributeValue})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getAttributesValues/:id/:page/:limit')
    async getAttributesValuesLimit(@Param('id') id: number, @Param('page') page:number, @Param('limit') limit:number){
        return this.productService.getAttributesValues(id,page,limit)
    }

    @ApiOperation({summary:'Получение количества страниц значений атрибутов'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCountAttributeValuesPages/:attributeId')
    async getCountAttributeValuesPages(@Param('attributeId') attributeId: number){
        return this.productService.getCountAttributeValuesPages(attributeId)
    }

    @ApiOperation({summary:'Получение товаров по категориям (с фильтрами)'})
    @ApiResponse({status: 200, type: Product})
    @Get('/getProductsClientCats/:idGroup/:idCategory/:price/:rating/:order/:limit/:offset')
    async getProductsCats(@Param() params: string[]){
        return this.productService.getProductsCats(params)
    }

    @ApiOperation({summary:'Получение товаров (с фильтрами)'})
    @ApiResponse({status: 200, type: Product})
    @Get('/getProductsClient/:price/:rating/:order/:limit/:offset/:search')
    async getProductsDef(@Param() params: string[]){
        return this.productService.getProductsDef(params)
    }

   

}
