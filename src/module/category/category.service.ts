import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { isBoolean, toBoolean } from 'src/common/utility/function.utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationGenerator, paginationSolver } from 'src/common/utility/pagination.utils';
import { UpdateCategory } from './dto/update-category';


@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private S3Service: S3Service
    ) { }


    async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
        let { slug, title, show, parentId } = createCategoryDto
        const { Location, Key } = await this.S3Service.uploadFile(image, 'snappfood')
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
            imageKey: Key,
            image: Location,
            parentId: parent?.id
        })
        return {
            message: "create category successfully"
        }
    }

    async findBySlug(slug: string) {
        const  category= await this.categoryRepository.findOne({ 
            where:{
                slug
            },
            relations:{
                children:true
            }
         })
         return category
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
            pagination: PaginationGenerator(page, limit, count),
            categories
        }
    }

    async updateCategory(id: number, image: Express.Multer.File, updateCategory: UpdateCategory) {
        const { parentId, show, slug, title } = updateCategory
        const category = await this.categoryRepository.findOneBy({ id })
        if (!category) throw new NotFoundException("category Not Found")
        const updateObject: DeepPartial<CategoryEntity> = {}
        if (image) {
            const { Location, Key } = await this.S3Service.uploadFile(image, "snappfood")
            if (Location) {
                updateObject["image"] = Location
                updateObject["imageKey"] = Key
                if(category?.imageKey){
                await this.S3Service.deleteFile(category?.imageKey)

                }
            }
        }
        if (title) updateObject["title"] = title
        if (show && isBoolean(show)) updateObject["show"] = isBoolean(show)
        if (parentId && isNaN(parseInt(parentId.toString()))) {
            const category = await this.categoryRepository.findOneBy({ parentId })
            if (!category) throw new NotFoundException("not found category parentId")
            updateObject["parentId"] = category.id
        }
        if (slug) {
            const category = await this.findBySlug(slug)
            if (category &&category.id !== id) throw new NotFoundException("categoryNot found")
                updateObject["slug"]=slug
        }
        await this.categoryRepository.update({id},updateObject)
        return {
            message:"updated Successfully" 
        }

    }

    async remove(id:number){
        const category=await this.categoryRepository.findOneBy({id})
        if(!category)throw new  NotFoundException("category not found")
            await this.categoryRepository.delete({id})

   
            if(category?.imageKey){
            await this.S3Service.deleteFile(category?.imageKey)
            }
        return{
            message: "delete category successfully"
        }
    }
}
