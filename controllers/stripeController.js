const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.stripeController = async (req, res) => {
  try {
    const { purchase, total_amount, shipping_fee } = req.body;
    const calculateOrdrAmount = () => {
      return total_amount + shipping_fee;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrdrAmount(),
      currency: "INR",
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.send({ message: err.message });
  }
};
