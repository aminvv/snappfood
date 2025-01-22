export type BasketType={
    total_amount: number
    total_discount_amount: number
    payment_amount: number
    food_list: foodItemsInBasket[]
    generalDiscountDetail: any
}
export type foodItemsInBasket={
    foodId: number,
    name: string,
    description?: string,
    count: number,
    image?: string,
    price: number,
    total_amount: number,
    discount_amount: number,
    payment_amount: number,
    discount_code?: number,
    supplier_name?: string,
    supplier_image?: string,
    supplierId:number,
}
