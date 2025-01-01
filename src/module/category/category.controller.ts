import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
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


  @Put("/update-category/:id")
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3('image'))
  updateCategory(@Param("id") id:number, @UploadedFile() image:Express.Multer.File ,@Body() updateCategory:UpdateCategory){
    return this.categoryService.updateCategory(id,image,updateCategory)
  }
  } 
