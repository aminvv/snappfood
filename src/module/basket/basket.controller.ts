import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { UserAuth } from 'src/common/decorator/auth.decorator';
import { ApiConsumes } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';

@Controller('basket')
@UserAuth()
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('/addToBasket')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  addToBasket(@Body() BasketDto: BasketDto) {
    return this.basketService.addToBasket(BasketDto);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete('/delete-item-from-basket') 
   @ApiConsumes(swaggerConsumes.UrlEncoded)
  removeFromBasket(@Body() basketDto: BasketDto) {
    return this.basketService.removeFromBasket(basketDto);
  }
}
