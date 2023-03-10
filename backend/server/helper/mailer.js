require("dotenv").config();

const nodeMailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const { ADMIN_EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const oauthLink = "https://developers.google.com/oauthplayground";

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauthLink);

exports.sendVerificationEmail = (email, userName, url) => {
  auth.setCredentials({ refresh_token: MAILING_REFRESH });
  const accessToken = auth.getAccessToken();

  const smtp = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: accessToken,
    },
  });

  if (!smtp) throw new Error();

  const emailBodyHtml = `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998">
<img src="https://res.cloudinary.com/dnskmq2ax/image/upload/v1672069454/share-book-logo/icons8-social-64_vjnjjl.png" alt="" style="width:30px" />
<span>Action required : Activate your Sharebook Account</span>
</div>
<div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
<span>Hello ${userName}</span>
<div style="padding:20px 0">
<span style="padding:1.5rem 0">
You recently created an account on sharebook. To complete your registration, please confirm your account.
</span>
</div>
<a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a>
<br />
<div style="padding-top:20px">
<span style="margin:1.5rem 0;color:#898f9c">
Sharebook allows you to stay in touch with all your friends, once registered on sharebook, you can share photos, organize events and much
more.
</span>
</div>
</div>`;

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: email,
    subject: "Sharebook email verification",
    html: emailBodyHtml,
  };

  smtp.sendMail(mailOptions, (error, response) => {
    if (error) return new Error();
    return response;
  });
};

exports.sendVerificationCode = (email, userName, code) => {
  auth.setCredentials({ refresh_token: MAILING_REFRESH });
  const accessToken = auth.getAccessToken();

  const smtp = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: ADMIN_EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: accessToken,
    },
  });

  if (!smtp) throw new Error();

  const emailBodyHtml = `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998">
  <img src="https://res.cloudinary.com/dnskmq2ax/image/upload/v1672069454/share-book-logo/icons8-social-64_vjnjjl.png" alt="" style="width:30px" />
  <span>Action required : Activate your Sharebook Account</span>
  </div>
  <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
  <span>Hello ${userName}</span>
  <div style="padding:20px 0">
  <span style="padding:1.5rem 0">
  You recently created an account on sharebook. To complete your registration, please confirm your account.
  </span>
  </div>
  <a style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">${code}</a>
  <br />
  <div style="padding-top:20px">
  <span style="margin:1.5rem 0;color:#898f9c">
  Sharebook allows you to stay in touch with all your friends, once registered on sharebook, you can share photos, organize events and much
  more.
  </span>
  </div>
  </div>`;

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: email,
    subject: "Reset Sharebook password",
    html: emailBodyHtml,
  };

  smtp.sendMail(mailOptions, (error, response) => {
    if (error) return new Error();
    return response;
  });
};
