import { PartialType } from '@nestjs/swagger';
import { BasketDto } from './create-basket.dto';

export class UpdateBasketDto extends PartialType(BasketDto) {}
