import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res){
    const {method} = req;
    if(method !== 'POST'){
        return;
    }

    const {name,email,city,street,postalCode,country,cartProduct} = req.body;

    const cartProductIds = cartProduct;
    const UniqueIds = [...new Set(cartProductIds)];
    const productInfos = await Product.find({_id: UniqueIds});

    const line_items = [];

    for(const product of UniqueIds){
        const productInfo = await productInfos.find(p=>p._id.toString() === product);
        const quantity = cartProductIds.filter(id=>id === product).length || 0;
        if(quantity > 0){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name: productInfo.title},
                    unit_amount: productInfo.price * quantity
                }
            })            
        }

    }

    const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        street,
        postalCode,
        country,
        paid: false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
        metadata: {orderId: orderDoc._id.toString()},
    });

    res.json({
        url: session.url
    });

}