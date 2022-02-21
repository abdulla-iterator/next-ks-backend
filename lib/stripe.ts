import Stripe from 'stripe';

const stripeConfig = new Stripe("sk_test_51HRuDgLzOiFxUrYZiOsWGsw9wtCAfgbXHofWzSIednKMss6e8gmdbtk9UoeXsKQ0S5JWYE80al1mNrIQlgiyDmqF00ILvEGIj7", {
  apiVersion: '2020-08-27',
});

export default stripeConfig;