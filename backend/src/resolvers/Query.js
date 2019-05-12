// const { forwardTo } = require("prisma-binding");
// const { hasPermission } = require("../utils");
// const { PERMISSIONS } = require("../PermissionTypes");
const { transport } = require("../mail");
const  HelloWorldEmail  = require("../emails/HelloWorld");


const Query = {
    // items : forwardTo('db'),
    // item : forwardTo('db'),
    // itemsConnection : forwardTo('db'),

    /**
         * Gets a current user
         */
    me(parent, arg, ctx, info) {
        const userId = ctx.request.userId;
        if (!userId) return null;
        return ctx.db.query.user(
            {
                where: { id: userId }
            },
            info
        );
    },

    /**
       * Sending emails method example with mjml templates
       * @param parent
       * @param args
       * @param ctx
       * @param info
       * @returns {Promise<*>}
       */
    async sendEmail(parent, args, ctx, info) {
        const { html, error } = HelloWorldEmail;
        if(error) throw new Error(error.message);


        const resRequest = await transport.sendMail({
            from : process.env.MAIL_OWNER_ADDRESS,
            to : "lol@mail.ru",
            subject : "Hello world",
            html
        });

        if(!resRequest.rejected.length) return { message : "Your email has been sent"};
        return { message : "There was a problem sending your email"};
    }

}

;

module.exports = Query;
