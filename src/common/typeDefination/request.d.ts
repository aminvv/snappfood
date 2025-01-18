import { SupplierEntity } from "src/module/supplier/entities/supplier.entity"

declare global{
    namespace Express{
        interface Request{
            supplier?:SupplierEntity,
            user?:UserEntity
        }
    }
}
declare global{
    namespace Express{
        interface Request{
            user?:UserEntity
        }
    }
}
export{}