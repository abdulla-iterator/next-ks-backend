import { rules, permission } from './../access';
import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn } from '../access';

export const User = list({
  access:{
    create:()=>true,
    read:rules.canManageUsers,
    update:rules.canManageUsers,
    delete:permission.canManageUsers,//only with permission can delete themeselves
  },
  ui:{
    hideCreate: (args) => !permission.canManageUsers(args),
    hideDelete: (args) => !permission.canManageUsers(args),
  },
 
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true }),
    password: password(),
    cart: relationship({ ref: 'CartItem.user', many: true,ui:{
      createView:{fieldMode:'hidden'},
      itemView:{fieldMode:'read'}
    } }),
    orders:relationship({ref:'Order.user',many:true}),
    role: relationship({
      ref: 'Role.assignedTo',
      // TODO: Add Access Control
      access:{
        create:permission.canManageUsers,
        update:permission.canManageUsers,
      }
    }),
    products:relationship({
      ref:'Product.user',
      many:true,
    })
  },
});
