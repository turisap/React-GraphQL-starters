const { transport } = require("../mail");
const VerificationEmail = require("../emails/EmailVerification");

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

        if(!resRequest.rejected.length) return { message : "Your email has been sent"};
        return resRequest;
    },

};

module.exports = EmailController;