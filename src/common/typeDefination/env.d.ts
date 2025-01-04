namespace NodeJS {
    interface ProcessEnv {
        // LOCAL PORT
        PORT: number

        //  DATABASE
        DB_PORT: number
        DB_HOST: string
        DB_NAME: string
        DB_USERNAME: string
        DB_PASSWORD: string

        // S3 SECRET
        S3_SECRET_KEY: string
        S3_ACCESS_KEY: string
        S3_BUCKET_NAME: string
        S3_ENDPOINT: string

        // TOKEN SECRET

        ACCESS_TOKEN_FOR_USER: string
        REFRESH_TOKEN_FOR_USER: string
        ACCESS_TOKEN_FOR_SUPPLIER: string
        REFRESH_TOKEN_FOR_SUPPLIER: string


    }
}