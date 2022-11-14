import React, { useRef, RefObject } from "react"
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from "../../context/StateContext"
import { urlFor } from "../../lib/client"
import getStripe from "../../lib/getStripe"


export default ({}: any): JSX.Element => {

  const cartRef = useRef<any>(null)
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()


  const handleCheckout = async () => {
    const stripe = await getStripe({
      isTest: false
    })

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(cartItems)
    })

    if (response.status === 500) return;

    const data = await response.json()
    toast.loading('Redirecting...')

    console.log('data: ', data)

    stripe?.redirectToCheckout({ sessionId: data.id })
  }


  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading"> Your Cart </span>
          <span className="cart-num-items"> ({ totalQuantities } items) </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3> yout Shopping Bag is empty </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item: any) => (
            <div className="product" key={item._id}>
              <img 
                className="cart-product-image"
                src={urlFor(item?.image[0]) as any} 
                alt="" 
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5> {item.name} </h5>
                  <h4> R${item.price},00 </h4>
                </div>

                <div className="flex bottom">
                  <div>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                      <AiOutlineMinus />
                    </span>

                    <span className='num'> { item.quantity } </span>

                    <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                      <AiOutlinePlus />
                    </span>
                  </p>
                  </div>

                  <button 
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3> Subtotal: </h3>
              <h3> R${totalPrice},00 </h3>
            </div>

            <div className="btn-container">
              <button 
                type="button"
                className="btn"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
