import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private S3Service: S3Service
    ) { }


    async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
        let { slug, title, show } = createCategoryDto
        const {Location} = await this.S3Service.uploadFile(image, 'snappfood')
        const category = await this.findBySlug(slug)
        if (category) throw new ConflictException('already  exist  category')
        if (isBoolean(show)) {
            show = toBoolean(show)
        }
        await this.categoryRepository.insert({
            title,
            slug,
            show,
            image:Location
        })
        return{
            message:"create category successfully"
        }
    }



    async findBySlug(slug:string){
        return await this.categoryRepository.findOneBy({slug})
    }
}
