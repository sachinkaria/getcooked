module.exports = (chef) => {
  return `
    <html>
        <p>Hello ${chef.firstName},</p>
        <p>Congratulations! You're profile has been approved and listed. It is now publicly searchable and you will be notified when you receive a booking request.</p>
        <p>Get Cooked</p>
    </html>
`;
};