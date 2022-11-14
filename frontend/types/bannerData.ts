import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

export type IBannerData = {
    buttonText: string,
    desc: string,
    discount: string,
    image: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    largeText1: string,
    largeText2: string,
    midText: string,
    product: string,
    saleTime: string,
    smallText: string,
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string,
}