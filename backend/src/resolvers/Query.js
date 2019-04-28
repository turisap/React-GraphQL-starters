const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const { PERMISSIONS } = require('../PermissionTypes');

const Query = {
    items : forwardTo('db'),
    item : forwardTo('db'),
    itemsConnection : forwardTo('db'),

    /**
     * Gets a current user
     */
    me(parent, arg, ctx, info) {
        const userId = ctx.request.userId;
        if(!userId) return null;
        return ctx.db.query.user(
            {
                where : { id : userId }
            },
            info
        )
    },

    async users(parent, arg, ctx, info) {
        if(!ctx.request.userId) throw new Error('You must be logged in');

        hasPermission(ctx.request.user, [PERMISSIONS.ADMIN, PERMISSIONS.PERMISSION_UPDATE]);

        return ctx.db.query.users({}, info);
    },

    async order(parent, arg, ctx, info) {
        // make sure the user is logged in
        if(!ctx.request.userId) throw new Error('you must be logged in');
        // query th current user
        const order = await ctx.db.query.order({
            where : { id : arg.id }
        }, info);
        // check if the user has permissions to see this order
        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionsToSeeOrder = ctx.request.user.permissions.includes(PERMISSIONS.ADMIN);
        if(!ownsOrder || !hasPermissionsToSeeOrder) throw  new Error("you can't see this order");
        // return the order
        return order;
    },

    async orders(parent, arg, ctx, info) {
        const { userId } = ctx.request;
        if(!userId) throw new Error('You must be logged in');
        return  ctx.db.query.orders({
            where : {
                user : { id : userId }
            }
        }, info)
    }
};

module.exports = Query;
