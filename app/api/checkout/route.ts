import {NextResponse} from 'next/server';
import Stripe from 'stripe';

export async function POST(req:Request){
  const secret=process.env.STRIPE_SECRET_KEY;
  if(!secret)return NextResponse.json({error:'Payments are not configured yet. Add STRIPE_SECRET_KEY to your environment.'},{status:503});
  try {
    const stripe=new Stripe(secret);
    const origin=process.env.NEXT_PUBLIC_SITE_URL||new URL(req.url).origin;
    const priceId=process.env.STRIPE_CONSULTATION_PRICE_ID;
    const cents=Number(process.env.CONSULTATION_PRICE_CENTS);
    if(!priceId && !(Number.isInteger(cents) && cents>=50)){
      return NextResponse.json({error:'Set STRIPE_CONSULTATION_PRICE_ID or CONSULTATION_PRICE_CENTS.'},{status:503});
    }
    const session=await stripe.checkout.sessions.create({
      mode:'payment',
      line_items:[priceId?{price:priceId,quantity:1}:{
        quantity:1,
        price_data:{currency:(process.env.CONSULTATION_CURRENCY||'usd').toLowerCase(),unit_amount:cents,
          product_data:{name:'1-Hour Consultation',description:'One-on-one consultation with Mikaila Brown'}}
      }],
      success_url:`${origin}/?consultation=success`,
      cancel_url:`${origin}/?consultation=cancelled#contact`,
      metadata:{product:'consultation-1h'}
    });
    if(!session.url)throw new Error('No checkout URL');
    return NextResponse.json({url:session.url});
  }catch{
    return NextResponse.json({error:'Could not start checkout. Please try again.'},{status:502});
  }
}
