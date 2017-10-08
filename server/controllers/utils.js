const knox = require('knox');

function imageUploader(options, callback) {
  const buffer = Buffer.from(options.data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const s3Client = knox.createClient({
    key: 'key',
    secret: 'secret',
    bucket: 'getcooked',
    endpoint: 'localhost',
    port: 10001,
    secure: true,
    style: 'path',
    region: 'eu'
  });

  uploadImage(options, callback);

  // put to a path in our bucket, and make readable by the public
  function uploadImage(data, callback) {
    const FILE_LENGTH = buffer.length;
    const FILE_NAME = data.filename;
    const FILE_TYPE = data.filetype;

    const header = {
      'Content-Length': FILE_LENGTH,
      'Content-Type': FILE_TYPE,
      'x-amz-acl': 'public-read'
    };

    const req = s3Client.put('/images/'.concat(FILE_NAME), header);

    req.on('response', (res) => {
      if (res.statusCode === 200) {
        console.log('Image saved on S3 to %s', req.url);
        callback(null, req.url);
      }
    });
    req.on('error', (error) => {
      console.log('Problem saving image to S3:', error.message);
      callback(error);
    });
    req.end(FILE_NAME);
  }
}

module.exports.imageUploader = imageUploader;