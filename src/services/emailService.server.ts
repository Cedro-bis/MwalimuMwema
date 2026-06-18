import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    // If using Gmail, use secure 'smtps' protocol or service 'gmail'
    const isGmail = SMTP_HOST.includes('smtp.gmail.com');
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: isGmail ? 465 : (Number(SMTP_PORT) || 587),
      secure: isGmail ? true : (Number(SMTP_PORT) === 465), // true for 465
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
  async sendVerificationEmail(to: string, code: string, appUrl?: string) {
    try {
      let emailTransporter = await getTransporter();
      
      const baseUrl = appUrl || process.env.APP_URL || 'http://localhost:3000';
      const magicLink = `${baseUrl}/?code=${code}`;

      const mailOptions = {
        from: '"Mwalimu Mwema 🎓" <no-reply@mwalimumwema.com>', // sender address
        to: to,
        subject: "Mwalimu Mwema - Votre connexion d'un clic", // Subject line
        text: `Bonjour, voici votre code de vérification : ${code}. Vous pouvez aussi cliquer sur ce lien pour vous connecter automatiquement : ${magicLink}`, // plain text body
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #78350f; font-size: 24px; margin: 0;">Mwalimu Mwema 🎓</h1>
              <p style="color: #92400e; font-weight: bold;">Le Bon Enseignant</p>
            </div>
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center;">
              <h2 style="color: #1e293b; font-size: 20px; margin-top: 0;">Connexion instantanée</h2>
              <p style="color: #475569; font-size: 16px;">Cliquez sur le bouton ci-dessous pour vous connecter directement en un seul clic, ou utilisez le code fourni.</p>
              
              <div style="margin: 35px 0;">
                <a href="${magicLink}" style="background-color: #000000; color: #ffffff; font-weight: bold; padding: 18px 30px; border-radius: 50px; text-decoration: none; font-size: 16px; display: inline-block;">
                  Se connecter d'un clic
                </a>
              </div>

              <p style="color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">OU UTILISEZ LE CODE</p>
              <div style="margin: 15px 0 30px 0;">
                <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #000000; background-color: #f1f5f9; padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1;">${code}</span>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Ne partagez pas cet e-mail. Si vous n'êtes pas à l'origine de cette demande, vous pouvez l'ignorer.</p>
            </div>
          </div>
        `,
      };

      let info;
      try {
        info = await emailTransporter.sendMail(mailOptions);
      } catch (err: any) {
        if (err.message.includes('534-5.7.9') || err.message.toLowerCase().includes('application-specific password required')) {
           console.error("\n" + "=".repeat(80));
           console.error("🚨 GMAIL AUTHENTICATION ERROR: App Password Required 🚨");
           console.error("=".repeat(80));
           console.error("You are trying to use your regular Gmail password. Google requires an 'App Password'.");
           console.error("To fix this:");
           console.error("1. Go to your Google Account -> Security (https://myaccount.google.com/security)");
           console.error("2. Enable 2-Step Verification if not already enabled.");
           console.error("3. Search for 'App passwords' in the Security search bar.");
           console.error("4. Create a new App password (select 'Mail' and 'Other').");
           console.error("5. Update your AI Studio Secrets (or .env file) to use the 16-character App Password.");
           console.error("=".repeat(80) + "\n");
        }
        
        console.error("Initial SMTP failed, falling back to Ethereal:", err.message);
        // Fallback to ethereal email if standard smtp fails
        const testAccount = await nodemailer.createTestAccount();
        emailTransporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
        info = await emailTransporter.sendMail(mailOptions);
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      const testMessageUrl = nodemailer.getTestMessageUrl(info);
      if (testMessageUrl) {
        console.log("Preview URL: %s", testMessageUrl);
      }
      return { success: true, previewUrl: testMessageUrl || magicLink };
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }
}
