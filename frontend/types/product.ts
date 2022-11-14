import { ParsedUrlQuery } from "querystring";

export interface IProduct {
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
    details: string,
    image: any,
    name: string,
    price: number,
    slug: any,
}

export interface IProductParams extends ParsedUrlQuery {
    slug: string
}

export interface ICartProduct extends IProduct {
    quantity: number,
}
