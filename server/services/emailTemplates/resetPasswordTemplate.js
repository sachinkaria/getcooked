module.exports = (hostname) => {
  return `
    <html>
        <p>To reset your password please click the following link ${hostname}</p>
    </html>
`;
};