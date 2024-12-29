import { Body, Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { uploadFileS3 } from 'src/common/interceptors/upload -file.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { uploadedOptionalFiles } from 'src/common/decorator/upload-file.decorator';
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService) { }


  @Post("/upload")
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3('image'))

  uploadFile(@uploadedOptionalFiles() image: Express.Multer.File, @Body() CreateCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(CreateCategoryDto,image)
  }

  @Get("/findAll")
  findAll(){
    return this.categoryService.findAll()
  }
  }
