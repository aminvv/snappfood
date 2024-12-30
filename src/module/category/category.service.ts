import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationGenerator, paginationSolver } from 'src/common/utility/pagination.utils';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private S3Service: S3Service
    ) { }


    async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
        let { slug, title, show, parentId } = createCategoryDto
        const { Location } = await this.S3Service.uploadFile(image, 'snappfood')
        const category = await this.findBySlug(slug)
        if (category) throw new ConflictException('already  exist  category')
        if (isBoolean(show)) {
            show = toBoolean(show)
        }
        let parent: CategoryEntity = null
        if (parentId && !isNaN(parentId)) {
            parent = await this.categoryRepository.findOneBy({ id: parentId });
        }


        await this.categoryRepository.insert({
            title,
            slug,
            show,
            image: Location,
            parentId: parent?.id
        })
        return {
            message: "create category successfully"
        }
    }



    async findBySlug(slug: string) {
        return await this.categoryRepository.findOneBy({ slug })
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit, page, skip } = paginationSolver(paginationDto)
        const [categories, count] = await this.categoryRepository.findAndCount({
            where: {},
            relations: {
                parent: true
            },
            select: {
                parent: {
                    title: true
                }
            },
            skip,
            take: limit,
            order: { id: "DESC" }
        })
        return {
            pagination: PaginationGenerator(page , limit, count),
            categories
        }
    }
}
