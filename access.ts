import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
export function isSignedIn({session}:ListAccessArgs){
    return !!session; // bang bang is truthy
}

const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission) => [permission, function({session}:ListAccessArgs){
        return !!session?.data?.role?.[permission];
    },])
)
//check persmissions yes||no
export const permission={
    ...generatedPermissions,
}

//rules=>yes||no || filter by owner can edit
export const rules={
    canManageProducts:function({session}:ListAccessArgs){
        if(!isSignedIn({session})){
            return false;
        }
       if(permission.canManageProducts({session})){
           return true;
       }
       return {user:{id:session.itemId}}
    },
       canOrder:function({session}:ListAccessArgs){
           if(!isSignedIn({session})){
               return false;
           }
        if(permission.canManageCart({session})){
            return true;
        }
        return {user:{id:session.itemId}}
     },
     canManageorderItems:function({session}:ListAccessArgs){
        if(!isSignedIn({session})){
            return false;
        }
        if(permission.canManageCart({session})){
            return true;
        }
        return { order:{user:{id:session.itemId}}}
     },
    canReadProducts({session}:ListAccessArgs){
        if(!isSignedIn({session})){
            return false;
        }
        if(permission.canManageProducts({session})){
            return true;//read all
        }
        return {status:'AVAILABLE'}//only see available products
    },
    canManageUsers:function({session}:ListAccessArgs){
        if(!isSignedIn({session})){
            return false;
        }
     if(permission.canManageUsers({session})){
         return true;
     }
     return {id:session.itemId}//only update own
  },
}

