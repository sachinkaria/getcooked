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
  twilio_number: process.env.TWILIO_NUMBER || 'Get Cooked',
  aws_key: process.env.AWS_KEY || 'key',
  aws_secret: process.env.AWS_SECRET || 'secret',
  aws_bucket: process.env.AWS_BUCKET || 'getcooked',
  aws_endpoint: process.env.AWS_ENDPOINT || 'localhost',
  aws_port: process.env.AWS_PORT || '10001',
  INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID || '5488025102f64456a5d18cc2ac36acf1',
  INSTAGRAM_REDIRECT_URI: process.env.INSTAGRAM_REDIRECT_URI || 'http://localhost:8080/instagram',
  INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET || '40859dba9a6844188a3c925049b33f34',
  sendGridKey: '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',
  stripe_secret_key: 'sk_test_DURHL3BvKBlILOjwzXbgwAE4'
};