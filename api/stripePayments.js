const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  try {

    const {products} = req.body;

    const lineItems = products?.map((product, index) => ({
  
        price_data: {
          currency: 'usd',

          product_data: {
          name: product.name,
          images:[product?.image],
          index 
          },

          unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));
    
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items: lineItems,
      mode:"payment",
      success_url:"", //success page url
      cancel_url:""   //cancel page url
    })
    res.json({clientSecret: session.client_secret})


} catch (error) {
  console.log("Error creating Stripe session:", error);
  res.status(500).json({error});
}
  
});

module.exports = router;