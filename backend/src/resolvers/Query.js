const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");
const { PERMISSIONS } = require("../PermissionTypes");
const { transport } = require('../mail');
const mjml2html = require('mjml');


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

        async sendEmail(parent, args, ctx, info) {
            // console.log('HUI');
            // return {text : 'HUEVO'}

            const htmlOutput = mjml2html(
              `
                      <mjml>
                        <mj-body>
                          <mj-section>
                            <mj-column>
                              <mj-text>
                                Hello World!
                              </mj-text>
                            </mj-column>
                          </mj-section>
                        </mj-body>
                      </mjml>
                    `
            );

            console.log(Object.keys(htmlOutput))

            const resRequest = await transport.sendMail({
                from : process.env.MAIL_OWNER_ADDRESS,
                to : 'lol@mail.ru',
                subject : 'Your password reset link',
                html : htmlOutput.html
            });
        }

}

;

module.exports = Query;
