const mjml = require("mjml");

const EmailVerificationEmail = data =>  (
    mjml(`
  <mjml>
  <mj-body>

   <mj-section background-color="#f0f0f0">
    <mj-column>
      <mj-text  font-style="italic"
                font-size="20px"
                color="#626262">
        
      </mj-text>
    </mj-column>
  </mj-section>

    <mj-section background-color="#fafafa">
        <mj-column width="400px">

          <mj-text font-style="italic"
                   font-size="20px"
                   font-family="Helvetica Neue"
                   color="#626262">Hello, ${data.name}, you have been registered for ${data.appName}. Please verify your email</mj-text>

            <mj-text color="#525252">
            If you think you did not registered at ${data.appName}, then just ignore this email
          </mj-text>

            <mj-button background-color="#F45E43"
                     href="${data.frontendURL}/verifyEmail?token=${data.verificationEmailToken}&id=${data.id}">Verify
                     </mj-button>
    </mj-column>
  </mj-section>

  </mj-body>
</mjml>
`)
);

module.exports = EmailVerificationEmail;
