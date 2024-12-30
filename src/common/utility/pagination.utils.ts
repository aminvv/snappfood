import { PaginationDto } from "../dto/pagination.dto";

export function paginationSolver(paginationDto:PaginationDto){
let{limit,page}=paginationDto
if(!page || page<=1)page=0
else page=page-1
if(!limit||limit<=1)limit=10
let skip=page*limit
return {
    page,
    limit,
    skip,
}
}


export function PaginationGenerator(page :number, limit:number,count:number){
    return{
        totalCount:count,
        itemPerPage:limit,
        page:page+1,
        pageCount:Math.ceil(count/limit)
    }
}