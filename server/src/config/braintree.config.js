import braintree from "braintree";
import config from "./env.config.js";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: config.BRAIN_TREE_MERCHANT_ID,
  publicKey: config.BRAIN_TREE_PUBLIC_KEY,
  privateKey: config.BRAIN_TREE_PRIVATE_KEY,
});

export default gateway;
