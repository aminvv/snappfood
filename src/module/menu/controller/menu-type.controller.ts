import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuTypeService } from "../service/menu-type.service";
import { menuTypeDto } from "../dto/menu-type.dto";
import { SupplierAuth } from "src/common/decorator/auth.decorator";
import { swaggerConsumes } from "src/common/enums/swaggerConsumes.enum";
import { Skip_Auth } from "src/common/decorator/skip-Auth.decorator";
@Controller('menu-type')
@ApiTags('menu-type')
@SupplierAuth()
export class MenuTypeController {
    constructor(
        private menuTypeService: MenuTypeService
    ) { }

    @Post("/create-type")
    @ApiConsumes(swaggerConsumes.UrlEncoded)
    create(@Body() menuTypeDto: menuTypeDto) {
        return this.menuTypeService.create(menuTypeDto)
    }
    @Get("/findAll-type")
    @ApiConsumes(swaggerConsumes.UrlEncoded)
    findAll() {
        return this.menuTypeService.findAll()
    }
    @Get("/findOneById-type/:id")
    @ApiConsumes(swaggerConsumes.UrlEncoded)
    findOneById(@Param("id") id:number) {
        return this.menuTypeService.findOneById(id)
    }
    @Delete("/remove-type/:id")
    @ApiConsumes(swaggerConsumes.UrlEncoded) 
    remove(@Param("id") id: number) {
        return this.menuTypeService.remove(id)
    }
    @Put("/update-type/:id")
    @ApiConsumes(swaggerConsumes.UrlEncoded)
    update(@Body() menuTypeDto: menuTypeDto, @Param('id') id:number) {
        return this.menuTypeService.update(menuTypeDto)
    }
}