const { transport } = require("../mail");
const VerificationEmail = require("../emails/EmailVerification");
const ResetPasswordEmail = require("../emails/ResetPassword");

const EmailController = {

    sendEmailVerificationEmail : async data => {

        const { html, error } = VerificationEmail(data);
        if(error) throw new Error(error.message);

        const resRequest = await transport.sendMail({
            from : process.env.MAIL_OWNER_ADDRESS,
            to : data.email,
            subject : `${process.env.APP_NAME} verification email`,
            html
        });

        if(resRequest.rejected.length) return { message : "There was a problem sending your email, try again later"};
        return resRequest;
    },

    sendResetPasswordEmail : async data => {
        const { html, error } = ResetPasswordEmail(data);
        if(error) throw new Error(error.message);

        const resRequest = await _sendMailUsingTransport(
            data.email, `${process.env.APP_NAME} password reset`, html
        );
        if(resRequest.rejected.length) throw new Error("There was a problem sending your email, try again later");
        return resRequest;
    },

};

/**
 * Sends an email using node-mailer based on arguments provided
 * @param to
 * @param subject
 * @param html
 * @returns {Promise<void>}
 * @private
 */
const _sendMailUsingTransport  = async (to, subject, html) => {
    await transport.sendMail({
        from : process.env.MAIL_OWNER_ADDRESS,
        to,
        subject,
        html
    });
};

module.exports = EmailController;