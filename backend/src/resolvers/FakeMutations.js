const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const FakeDataMutations = {
  async fakeSignup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const email = args.email;
    const existingUser = await ctx.db.query.user({ where: { email } });
    if (existingUser) throw new Error("This email is already in use");

    const randomBytesPromisified = promisify(randomBytes);
    const verificationEmailToken = (await randomBytesPromisified(20)).toString(
      "hex"
    );

    const password = await bcrypt.hash(args.password, 10);
    return await ctx.db.mutation.createUser(
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
          },
          emailVerified: true
        }
      },
      info
    );
  },
};

module.exports = FakeDataMutations;