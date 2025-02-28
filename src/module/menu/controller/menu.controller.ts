import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, Req } from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';
import { uploadFileS3 } from 'src/common/interceptors/upload -file.interceptor';
import { uploadedOptionalFiles } from 'src/common/decorator/upload-file.decorator';
import { ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { SupplierAuth } from 'src/common/decorator/auth.decorator';
import { Skip_Auth } from 'src/common/decorator/skip-Auth.decorator';

@Controller('menu')
@SupplierAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post('/create-menu-item')
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3("image"))
  MenuTypeService(@Body() createMenuItemDto: CreateMenuItemDto, @uploadedOptionalFiles() image: Express.Multer.File) {
    return this.menuService.createMenuitem(createMenuItemDto, image)

  }

  @Get('/findAll-slug/:slug')
  @Skip_Auth()
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  findOne(@Param("slug") slug: string) {
    return this.menuService.findOne(slug,)
  }

  @Delete('/delete-menu-item/:id')
  @ApiConsumes(swaggerConsumes.MultiPartData)
  delete(@Param("id") id: number) {
    return this.menuService.delete(id)
  }

  @Put('update-menu-item/:id')
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(uploadFileS3("image"))
  update(@Param("id") id: number,@Body() createMenuItem: CreateMenuItemDto, @UploadedFile() image: Express.Multer.File) {
    return this.menuService.update(id, createMenuItem, image)
  }

}