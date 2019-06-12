const mjml = require("mjml");

const ResetPasswordEmail = data =>  (
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
                   color="#626262">Hello, ${data.name}, you have requested password reset at ${data.appName}</mj-text>

            <mj-text color="#525252">
            If you think you did not requested your password reset, then just ignore this email
          </mj-text>

            <mj-button background-color="#F45E43"
                     href="${data.frontendURL}/resetPassword?token=${data.resetToken}">ResetPassword
                     </mj-button>
    </mj-column>
  </mj-section>

  </mj-body>
</mjml>
`)
);

module.exports = ResetPasswordEmail;
