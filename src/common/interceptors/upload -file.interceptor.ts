import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { memoryStorage } from "multer";

export function uploadFileS3(fieldName:string) {
    return class uploadUtility extends FileInterceptor(fieldName,{
        storage:memoryStorage()
    }){}
}

export function documentFileFields(uploadFields:MulterField[]){
    return class uploadUtility extends FileFieldsInterceptor(uploadFields,{
        storage:memoryStorage()
    }){}
}