import { IProduct } from '../../types/product'
import { urlFor } from '../../lib/client'
import Link from 'next/link'

interface ProductProps {
  product: IProduct
}

export default ({ product }: ProductProps): JSX.Element => {

  const { image, name, slug, price } = product
 
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img 
            className='product-image'
            src={urlFor(image[0]) as any} 
            alt=""
            width={250}
            height={250}
          />
          <p className='product-name'> {name} </p>
          <p className='product-price'> R${price},00 </p>
        </div>
      </Link>
    </div>    
  )
}
