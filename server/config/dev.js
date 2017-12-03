/**
 * Created by sachinkaria on 05/05/2017.
 */
module.exports = {
  // Secret key for JWT signing and encryption
  jwt_secret: process.env.JWT_SECRET || '3456789pkjgfdfbnmgt7y89iuhgyr787iubh',
  // Database connection information
  database: process.env.DATABASE || 'mongodb://localhost/get-cooked',
  // Server port
  port: process.env.PORT || 3000,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID || 'AC1f9b1e64fada50b398d028d44653a48d',
  twilio_token: process.env.TWILIO_TOKEN || '5d90b358c5c7b1e9f0ab8ed31b00f435',
  aws_key: process.env.AWS_KEY || 'key',
  aws_secret: process.env.AWS_SECRET || 'secret',
  aws_bucket: process.env.AWS_BUCKET || 'getcooked',
  aws_endpoint: process.env.AWS_ENDPOINT || 'localhost',
  aws_port: process.env.AWS_PORT || '10001'
};