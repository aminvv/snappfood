import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { uploadFileS3 } from 'src/common/interceptors/upload -file.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { uploadedOptionalFiles } from 'src/common/decorator/upload-file.decorator';
import { Pagination } from 'src/common/decorator/pagination.decoratotr';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateCategory } from './dto/update-category';
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService) { }


  @Post("/upload")
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3('image'))

  uploadFile(@uploadedOptionalFiles() image: Express.Multer.File, @Body() CreateCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(CreateCategoryDto, image)
  }

  @Get("/findAll")
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto ){
    return this.categoryService.findAll(paginationDto)
  }

  @Get('find-By-slug/:slug')
  findBySlug(@Param('slug') slug:string){
    return this.categoryService.findBySlug(slug)
  }
  @Get('find-By-slug/:id')
  findById(@Param('id') id:number){
    return this.categoryService.findById(id)
  }


  @Put("/update-category/:id")
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3('image'))
  updateCategory(@Param("id") id:number, @UploadedFile() image:Express.Multer.File ,@Body() updateCategory:UpdateCategory){
    return this.categoryService.updateCategory(id,image,updateCategory)
  }

  @Delete("/delete-category/:id")
  remove(@Param("id") id:number  ){
    return this.categoryService.remove(id)
  }



  } 
