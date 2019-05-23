const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const EmailController = require("../controllers/EmailController");

const Mutations = {
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const email = args.email;
        const existingUser = await ctx.db.query.user({ where: { email } });
        if (existingUser) throw new Error("This email is already in use");

        const randomBytesPromisified = promisify(randomBytes);
        const verificationEmailToken = (await randomBytesPromisified(20)).toString(
            "hex"
        );

        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                    verificationEmailToken,
                    permissions: { set: ["USER"] },
                    occupation : {
                        connect : {
                            id : args.occupation
                        }
                    }
                }
            },
            info
        );

        EmailController.sendEmailVerificationEmail({
            ...user,
            appName: process.env.APP_NAME,
            frontendURL: process.env.FRONTEND_URL
        });

        _signInWithToken(ctx, user, 14);
        return user;
    },

    /**
   * Sets finds a user based on id and sets user's verification token to null
   * gets triggered on loading link from email verification after registration
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
    async verifyEmail(parent, { id }, ctx, info) {
        const user = await ctx.db.query.user({ where: { id } });
        if (!user) throw new Error("There is no such a user for these terms");

        await ctx.db.mutation.updateUser({
            where: { id },
            data: {
                verificationEmailToken: null,
                emailVerified: true
            }
        });

        return user;
    },

    async signin(parent, { email, password }, ctx, info) {
        const user = await ctx.db.query.user({ where: { email } });
        if (!user) throw new Error(`There is no such a user for this ${email}`);

        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser) throw new Error("Wrong password");

        _signInWithToken(ctx, user, 14);
        return user;
    },

    signout(parent, args, ctx, info) {
        ctx.response.clearCookie("token");
        return { message: "GoodBuy" };
    },

    async requestReset(parent, args, ctx, info) {
        const user = _getUser(ctx, args.email);
        if (!user)
            throw new Error(`There is no such a user for this ${args.email}`);

        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(20)).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000;

        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: {
                resetToken,
                resetTokenExpiry
            }
        });

        EmailController.sendResetPasswordEmail({
            ...updatedUser,
            appName: process.env.APP_NAME,
            frontendURL: process.env.FRONTEND_URL
        });

        return { message: "Goodbuy" };
    },

    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword)
            throw new Error("Your passwords does not match");

        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        });

        if (!user) throw new Error("This reset token is either expired or invalid");

        const password = await bcrypt.hash(args.password, 10);

        const updatedUser = ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        _signInWithToken(ctx, updatedUser, 2);

        return updatedUser;
    },

    async createProject(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");

        return await ctx.db.mutation.createProject({
            data : {
                ...args,
                owner : {
                    connect: { id : userId }
                }
            }
        }, info);
    },

    async createJob(parent, args, ctx, info) {
        const { userId, projectId } = ctx.request;
        if (!userId) throw new Error("You must be logged in..");
        if (!projectId) throw new Error("Please choose a project to work with");
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
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * days
    });
};

const _getUser = async (ctx, email) =>
    await ctx.db.query.user({ where: { email } });

module.exports = Mutations;
