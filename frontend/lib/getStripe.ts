import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

interface getStripeProp {
  isTest: boolean
}

const getStripe = ({ isTest }: getStripeProp) => {

  const stripe_publishable_key = isTest
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!stripePromise) {
    stripePromise = loadStripe(stripe_publishable_key as string)
  }

  console.log('DEVELOPMENT_MODE: ', isTest)

  return stripePromise
}

export default getStripe