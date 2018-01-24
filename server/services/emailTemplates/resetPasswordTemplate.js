module.exports = (hostname, user) => {
  return `
    <html>
        <p>Hello ${user.firstName},</p>
        <br>
        <p>To reset your password please click the following link ${hostname}</p>
        <br>
        <p>Regards,</p>
        <p>Get Cooked</p>
    </html>
`;
};