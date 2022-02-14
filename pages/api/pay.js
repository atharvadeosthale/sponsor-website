// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(400).json({ message: "Invalid method" });
    let { amount, name, email, message } = req.body;
    if (!amount || !name || !email)
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    // if message null, fallback to empty string
    if (!message) message = "";

    // create a customer with the provided details
    const customer = await stripe.customers.create({
      name,
      email,
    });

    // proceed to create paymentIntent and attach it to customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseInt(amount) * 100),
      currency: "inr",
      receipt_email: email,
      metadata: {
        message,
        name,
        email,
      },
      customer: customer.id,
      payment_method_types: ["card"],
    });

    res.json({
      message: "Payment initiated successfully!",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
