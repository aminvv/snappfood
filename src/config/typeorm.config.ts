
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";


export function TypeOrmConfig():TypeOrmModuleOptions{
    const{DB_HOST,DB_PASSWORD,DB_PORT,DB_USERNAME,DB_NAME}=process.env
    return{
        type:"mysql",
        host:DB_HOST,
        port:DB_PORT,
        database:DB_NAME,
        username:DB_USERNAME,
        password:DB_PASSWORD,
        autoLoadEntities:false,
        entities:[join(__dirname,"../module/**/entities/*.entity{.ts,.js}")],
        synchronize:true


    }
}  
     