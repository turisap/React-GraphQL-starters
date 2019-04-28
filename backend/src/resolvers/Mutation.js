const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const { PERMISSIONS, ALLOWED_DELETE_ITEMS } = require('../PermissionTypes');
const stripe = require('../stripe');



const Mutations = {

    async createItem(parent, args, ctx, info) {
        // TODO check if user is logged in
        if(!ctx.request.userId) throw new Error('You must be logged in to do this');
        console.log(ctx.request)
        const item = await ctx.db.mutation.createItem({
            data: {
                // this is the relationships between user and item
                user : {
                    connect : {
                        id : ctx.request.userId
                    }
                },
                ...args
            }
        }, info);
        return item;
    },



    updateItem(parent, args, ctx, info) {
        const updates = {...args};
        delete updates.id;
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info)
    },



    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // find the item
        const item = await ctx.db.query.item({where}, `{ id title user { id } }`);
        // check permissions
        const ownsItem = ctx.request.userId === item.user.id;
        const hasPermissions = ctx.request.user.permissions.some(permission => {
            ALLOWED_DELETE_ITEMS.includes(permission)
        });

        if(!ownsItem && hasPermissions) {
            throw new Error('You are not allowed to do that');
        }
        // delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },



    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: {set: ['USER']}
            }
        }, info);

        _signInWithToken(ctx, user, 14);
        return user;
    },




    async signin(parent, {email, password}, ctx, info) {
        const user = await ctx.db.query.user({where: {email}});
        if (!user) throw new Error(`There is no such a user for this ${email}`);


        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser) throw new Error('Wrong password');

        _signInWithToken(ctx, user, 14);
        return user;
    },




    signout (parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'GoodBuy'}
    },



    async requestReset(parent, args, ctx, info) {
        const user = _getUser(ctx, args.email);
        if (!user) throw new Error(`There is no such a user for this ${args.email}`);

        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        const res = await ctx.db.mutation.updateUser({
            where : { email : args.email },
            data  : {
                resetToken,
                resetTokenExpiry
            }
        });

        const resRequest = await transport.sendMail({
            from : process.env.MAIL_OWNER_ADDRESS,
            to : args.email,
            subject : 'Your password reset link',
            html : makeANiceEmail(`Your password reset token is here!
            <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset your Password</a>`)
        });
      
        return {message : "Goodbuy"}
    },



    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) throw new Error("Your passwords does not match");

        const [user] = await ctx.db.query.users({
            where : {
                resetToken : args.resetToken,
                resetTokenExpiry_gte : Date.now() - 3600000
            }
        });

        if(!user) throw new Error("This reset token is either expired or invalid");

        const password = await bcrypt.hash(args.password, 10);

        const updatedUser = ctx.db.mutation.updateUser({
            where : { email : user.email },
            data  : {
                password,
                resetToken : null,
                resetTokenExpiry: null
            }
        });

        _signInWithToken(ctx, updatedUser, 2);

        return updatedUser;
    },

    async updatePermissions (parent, args, ctx, info) {
        if (!ctx.request.userId) throw new Error('You must be logged in');
        const user = await ctx.db.query.user({
            where : {
                id : ctx.request.userId
            }
        }, info);

        console.log("USER", user);
        if (user) {
            hasPermission(user, [PERMISSIONS.ADMIN, PERMISSIONS.PERMISSIONUPDATE]);

            // wer use "set" for permissions because it is ENUM type
            return await ctx.db.mutation.updateUser({
                data : {
                    permissions: {
                        set : args.permissions
                    }
                },
                where : {
                    id : args.userId
                }
            }, info)
        }
    },

    async addToCart(parent, args, ctx, info) {
        // make user the user is signed in
        const { userId } = ctx.request;
        if (!userId) throw new Error("You must be signed in");

        // query the user's current cart
        const [existingCartItem] = await ctx.db.query.cartItems({
            where : {
                user : { id : userId},
                item : { id : args.id}
            }
        }, info);
        // console.log(existingCartItem);
        // return;

        // check if this item is already in the cart and update it if it is
        if(existingCartItem) {
            console.log("EXISTING ITEM", existingCartItem)
            console.log('This item is already in the cart');
            return ctx.db.mutation.updateCartItem({
                where : { id : existingCartItem.id },
                data  : { quantity : existingCartItem.quantity + 1 }
            },info)
        }

        return ctx.db.mutation.createCartItem({
            // "connect" here establish relationships between cartItem and user and item types
            data : {
                user : {
                    connect : { id : userId }
                },
                item : {
                    connect : { id : args.id }
                }
            },
        })
    },

    async removeFromCart(parent, args, ctx, info) {
        // find the cart item
        const cartItem = await ctx.db.query.cartItem({
            where : { id : args.id }
        }, `{id, user {id}}`);
        if(!cartItem) throw new Error("Now cart item found");

        return ctx.db.mutation.deleteCartItem({
            where : {
                id : args.id
            }
        })
    },


    async createOrder(parent, args, ctx, info) {
        // query the current user and make sure they are signed in
        const { userId } = ctx.request;
        if(!userId) throw new Error('You must be signed in to complete this order');
        const user = await ctx.db.query.user(
            { where : { id : userId }},
            `{
            id
            name
            email
            cart {
            id
            quantity
            item {title price id description image largeImage}
            }
            }`
        );
        // console.log('++++++++++++++++++++++++++++++++')
        // console.log(user.cart[0].item)
        // recalculate amount
        const amount = user.cart.reduce((tally, cartItem) => tally + cartItem.item.price + cartItem.quantity, 0);
        console.log(`Going to charge ${amount}`);

        // create a stripe charge (turn the token into money)
        const charge = await stripe.charges.create({
            amount,
            currency : process.env.CURRENCY,
            source : args.token
        });

        // convert the cartItems to orderItems
        const orderItems = user.cart.map(cartItem => {
            const orderItem = {
                ...cartItem.item,
                quantity: cartItem.quantity,
                // relationships to user
                user : { connect : { id : user.id }}
            };
            // remove id as it was copied from cartItem, but should be created by prisma
            delete orderItem.id;
            return orderItem;
        });

        // create an order
        const order = ctx.db.mutation.createOrder({
            data : {
                total : charge.amount,
                charge : charge.id,
                items : { create : orderItems },
                user : { connect : { id : userId }}
            }
        });

        const cartItemIds = user.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteManyCartItems({
            where : {
                id_in : cartItemIds
            }
        });

        return order;
    }
};


/**
 * Creates a token based on user's id and sets a cookie with it
 * @param ctx
 * @param user
 * @param days
 * @private
 */
const _signInWithToken = (ctx, user, days) => {
    const token = jwt.sign({userId : user.id}, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 * days
    });
};

const _getUser = async (ctx, email) => await ctx.db.query.user({where: {email}});


module.exports = Mutations;
