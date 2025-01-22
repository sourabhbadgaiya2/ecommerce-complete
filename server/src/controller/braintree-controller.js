import gateway from "../config/braintree.config.js";

export const generateToken = async (req, res, next) => {
  try {
    const result = await gateway.clientToken.generate();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error generating Braintree token:", error.message);
    next(error);
  }
};

export const processPayment = async (req, res, next) => {
  const { paymentMethodNonce, amount } = req.body;

  try {
    // Charge the payment using Braintree's gateway
    const newTransaction = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: paymentMethodNonce,
      options: {
        submitForSettlement: true, // Automatically settle the transaction
      },
    });

    // Check if the transaction was successful
    if (newTransaction.success) {
      // console.log("Transaction successful:", newTransaction);
      return res.status(200).json({
        success: true,
        transactionId: newTransaction.transaction.id,
        amount: amount,
        message: "Payment processed successfully!",
      });
    } else {
      // Handle transaction failure
      console.error("Transaction failed:", newTransaction.message);
      return res.status(500).json({
        success: false,
        message: newTransaction.message || "Payment processing failed.",
      });
    }
  } catch (error) {
    console.error("Error processing payment:", error.message);
    next(error);
  }
};
