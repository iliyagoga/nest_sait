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

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @UseGuards(JwtAuthGuard)
    @Post('/createAttribute')
    async createAttribute(@Body() dto: AttributeDto){
        return this.productService.createAttribute(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/renameAttribute')
    async renameAttribute(@Body() dto: RenameAttributeValue){
        return this.productService.renameAttribute(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteAttribute')
    async deleteAttribute(@Body() body: object){
        return this.productService.deleteAttribute(body['id']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/createAttributeValue')
    async createAttributeValue(@Body() dto: AttributeValueDto){
        return this.productService.createAttributeValue(dto);

    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteAttributeValue')
    async deleteAttributeValue(@Body() body: object){
        return this.productService.deleteAttributeValue(body['id']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/renameAttributeValue')
    async renameAttributeValue(@Body() dto: RenameAttributeValue){
        return this.productService.renameAttributeValue(dto);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/createProduct")
    async createProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        if(dto.productName.length>0 && dto.productName.length>0){
            return this.productService.createProduct(dto,images)
        }
        throw new HttpException("Имя и короткое описание продукта должны быть заполнены", HttpStatus.BAD_REQUEST)    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/redactGalleryProduct")
    async redactGalleryProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        return this.productService.updateGalleryProduct(images,dto);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/createGalleryProduct")
    async createGalleryProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        if(dto.productName.length>0 && dto.productName.length>0){
            return this.productService.createGalleryProduct(images,dto)
        }
        throw new HttpException("Имя и короткое описание продукта должны быть заполнены", HttpStatus.BAD_REQUEST)    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/redactProduct")
    async redactProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        return this.productService.redactProduct(dto, images);
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('img'))
    @Post("/updateGalleryProduct")
    async updateGalleryProduct(@UploadedFiles() images: Blob[],  @Body() dto: ProductDto){
        return this.productService.updateGalleryProduct(images,dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/deleteProduct")
    async deleteProduct(@Body() data: object){
        return this.productService.deleteProduct(data["id"]);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getProducts/:page/:limit/:price/:date')
    async getProducts(@Param() pars: string[]){
        return this.productService.getProducts(pars);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getProduct/:id')
    async getProduct(@Param('id') id: string){
        return this.productService.getProduct(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getPhotos')
    async getPhotos(){
        return this.productService.getPhotos();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/searchProducts/:search')
    async searchProducts(@Param('search') search:string ){
        return this.productService.searchProduct(search);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAttributes/:num')
    async getAttributes(@Param('num') page: number){
        return this.productService.getAttributes(page)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAttributes/:num/:limit')
    async getAttributesLimit(@Param('num') page: number, @Param('limit') limit: number){
        return this.productService.getAttributes(page,limit)
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('/getCountAttributesPages')
    async getCountAttributesPages(){
        return this.productService.getCountAttributesPages()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAttributesValues/:id/:page')
    async getAttributesValues(@Param('id') id: number, @Param('page') page:number){
        return this.productService.getAttributesValues(id,page)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAttributesValues/:id/:page/:limit')
    async getAttributesValuesLimit(@Param('id') id: number, @Param('page') page:number, @Param('limit') limit:number){
        return this.productService.getAttributesValues(id,page,limit)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCountAttributeValuesPages/:attributeId')
    async getCountAttributeValuesPages(@Param('attributeId') attributeId: number){
        return this.productService.getCountAttributeValuesPages(attributeId)
    }


}
