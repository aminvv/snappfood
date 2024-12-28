import { Body, Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { uploadFileS3 } from 'src/common/interceptors/upload -file.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @Post("/upload")
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3('image'))
  uploadFile(@UploadedFile(new ParseFilePipe({
      validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: "image/(png|jpg|jpeg|webp)" })
      ]
  }))image:Express.Multer.File,@Body()CreateCategoryDto:CreateCategoryDto) { 
    const {size,mimetype,fieldname,originalname,filename}=image
      return{
          image:{size,mimetype,fieldname,originalname,filename},
          CreateCategoryDto
      }
  }
}
 