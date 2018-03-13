module.exports = (chef, hostname) => {
  return `
    <html>
        <p>Hello ${chef.firstName},</p>
        <br>
        <p>You're profile has been unlisted. Please update your payment details to continue receiving booking requests.</p>
        <p>You can update your details via your dashboard or click on the follow link: ${hostname}</p>
        <br>
        <p>Regards,</p>
        <p>Get Cooked</p>
    </html>
`;
};