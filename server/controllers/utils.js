const knox = require('knox');
const jimp = require('jimp');

function imageUploader(options, type, callback) {
  const buffer = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const s3Client = knox.createClient({
    key: 'key',
    secret: 'secret',
    bucket: 'getcooked',
    endpoint: 'localhost',
    port: 10001,
    secure: false,
    style: 'path',
    region: 'eu'
  });

  jimp.read(buffer, onOpen);

  function onOpen(err, Img) {
    const PROFILE_WIDTH = 600;
    const PROFILE_HEIGHT = 600;
    const COVER_WIDTH = 2600;
    const COVER_HEIGHT = 800;

    if (err) {
      console.log('opening image error', err);
    }

    Img = (type === 'profile') ? Img.scaleToFit(PROFILE_WIDTH, PROFILE_HEIGHT) : Img;
    Img = (type === 'cover') ? Img.scaleToFit(COVER_WIDTH, COVER_HEIGHT) : Img;

    Img.getBuffer(jimp.MIME_JPEG, uploadImage.bind(callback));
  }

  // put to a path in our bucket, and make readable by the public
  function uploadImage(cb, img) {

    const FILE_LENGTH = img.length;
    const FILE_NAME = options.filename;
    const FILE_TYPE = options.filetype;

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
    req.end(img);
  }
}

module.exports.imageUploader = imageUploader;