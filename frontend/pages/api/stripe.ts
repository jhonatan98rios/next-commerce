import NextCors from 'nextjs-cors';

import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { ICartProduct } from '../../types/product'

const isTest = process.env.DEVELOPMENT_MODE == "true"

const stripe_secret_key = isTest
  ? process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY_TEST
  : process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

const shipping_options = isTest
  ? [{ shipping_rate: 'shr_1M3rwwAqYxZT24KBIV4MzD9H' }]
  : [{ shipping_rate: 'shr_1M3ptyAqYxZT24KBTs0TDCB9' }]


const stripe = new Stripe(
  stripe_secret_key as string, 
  { apiVersion: '2022-08-01' }
)

async function corsConfig(req: NextApiRequest, res: NextApiResponse){
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
 });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  corsConfig(req, res)

  if (req.method === 'POST') {

    console.log('DEVELOPMENT_MODE: ', isTest)

    try {
      const params = {
        submit_type:'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options,
        line_items: req.body.map((item: ICartProduct) => {

          const img = item.image[0].asset._ref
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/avdiposy/production/').replace('-webp', '.webp')

          return {
            price_data: {
              currency: 'brl',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params as any)
      res.status(200).json(session)

    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}