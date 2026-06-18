import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  } else {
    // Generate a test account if no SMTP provided
    console.log("No SMTP properties provided. Generating Ethereal email test account...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  return transporter;
}

export const EmailService = {
  async sendVerificationEmail(to: string, code: string) {
    try {
      const emailTransporter = await getTransporter();

      const info = await emailTransporter.sendMail({
        from: '"Mwalimu Mwema 🎓" <no-reply@mwalimumwema.com>', // sender address
        to: to,
        subject: "Mwalimu Mwema - Votre code de vérification", // Subject line
        text: `Bonjour, voici votre code de vérification : ${code}. Il est valide pour terminer votre inscription.`, // plain text body
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #78350f; font-size: 24px; margin: 0;">Mwalimu Mwema 🎓</h1>
              <p style="color: #92400e; font-weight: bold;">Le Bon Enseignant</p>
            </div>
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;">
              <h2 style="color: #1e293b; font-size: 20px; margin-top: 0;">Vérification de compte</h2>
              <p style="color: #475569; font-size: 16px;">Veuillez utiliser le code ci-dessous pour finaliser votre inscription.</p>
              <div style="margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000000; background-color: #f1f5f9; padding: 15px 30px; border-radius: 8px; border: 1px solid #cbd5e1;">${code}</span>
              </div>
              <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Ne partagez pas ce code. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail.</p>
            </div>
          </div>
        `,
      });

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      const testMessageUrl = nodemailer.getTestMessageUrl(info);
      if (testMessageUrl) {
        console.log("Preview URL: %s", testMessageUrl);
      }
      return { success: true, previewUrl: testMessageUrl };
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }
}
