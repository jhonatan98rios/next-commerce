import Link from "next/link";
import { urlFor } from '../../lib/client'

import { IBannerData } from '../../types/bannerData'


interface HeroBannerProps {
  heroBanner: IBannerData
}

export default ({ heroBanner }: HeroBannerProps): JSX.Element => {

  const { smallText, midText, largeText1, image, product, buttonText, desc } = heroBanner

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        
        <img 
          src={urlFor(image) as any} 
          alt="headphones" 
          className="hero-banner-image" 
        />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">
              {buttonText}
            </button>
          </Link>

          <div className="desc">
            <h5> Description  </h5>
            <p> { desc } </p>
          </div>
        </div>
      </div>
    </div>
  )
}
