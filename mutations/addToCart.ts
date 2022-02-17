import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { CartItem } from '../schemas/Cart';
import { Session } from '../types';

import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding to Cart');
  // check signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) { 
    throw new Error('you must be logged in to do this!');
  }
  //  current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // console.log(existingCartItem)
    console.log(
      `there are already ${existingCartItem.quantity}, increment by 1`
    );
    // current item is in  cart
    // if itis, increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }
  //  if it isnt, create a new cart item!
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId }},
      user: { connect: { id: sesh.itemId }},
    },
    resolveFields: false,
  })
}

export default addToCart;
