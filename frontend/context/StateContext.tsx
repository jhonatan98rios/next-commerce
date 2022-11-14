import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Product } from "../components";
import { ICartProduct, IProduct } from "../types/product";


const Context = createContext<any>({})

export const StateContext = ({ children }: any) => {

  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<ICartProduct[] | any[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQuantities, setTotalQuantities] = useState<number>(0)
  const [qty, setQty] = useState(1)

  let foundProduct: ICartProduct;
  let index;

  const onAdd = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find((item: ICartProduct) => item._id === product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
    
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: ICartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems)

    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to the cart`)
  }

  const onRemove = (product: ICartProduct) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id: string, value:string) => {
    foundProduct = cartItems.find((item) => item._id === id )
    index = cartItems.findIndex((product) => product._id === id )

    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {

      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
      setTotalPrice((prevtotalPrice) => prevtotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
      
    } else if (value === 'dec') {

      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
        setTotalPrice((prevtotalPrice) => prevtotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
