import { rules } from './../access';
import { text, select, integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn } from '../access';

export const Product = list({
  access: {
    create:isSignedIn,
    read:rules.canReadProducts,
    update:rules.canManageProducts,
    delete:rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Available', value: 'Aavailable' },
        { label: 'Unavailable', value: 'Unavailable' },
      ],
      defaultValue: 'Draft',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    user: relationship({
      ref:'User.products',
      defaultValue:({context})=>({
        connect:{id:context.session.itemId}
      })
    })
    // TODO: Photo
  },
});
