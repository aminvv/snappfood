import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketDto, DiscountBasketDto } from './dto/create-basket.dto';
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
  @Post('/add-discountToBasket')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  addDiscount(@Body() discountBasketDto: DiscountBasketDto) {
    return this.basketService.addDiscount(discountBasketDto);
  }
  @Post('/delete-discountToBasket')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  removeDiscount(@Body() discountBasketDto: DiscountBasketDto) {
    return this.basketService.removeDiscount(discountBasketDto);
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
