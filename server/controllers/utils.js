const knox = require('knox');
const jimp = require('jimp');
const Review = require('../models/review');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

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

function imageUploader(options, type, callback) {
  const buffer = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  jimp.read(buffer, onOpen);

  function onOpen(err, Img) {
    const PROFILE_WIDTH = 600;
    const PROFILE_HEIGHT = 600;
    const COVER_WIDTH = 1440;
    const COVER_HEIGHT = 960;
    const STANDARD_WIDTH = 1440;
    const STANDARD_HEIGHT = 960;

    if (err) {
      callback(err);
    }

    if (type && type === 'profile') {
      Img = Img.scaleToFit(PROFILE_WIDTH, PROFILE_HEIGHT);
    } else if (type && type === 'cover') {
      Img = Img.scaleToFit(COVER_WIDTH, COVER_HEIGHT);
    } else {
      Img = Img.scaleToFit(STANDARD_WIDTH, STANDARD_HEIGHT);
    }

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

    const req = s3Client.put(`/images/users/${options.userId}/${type}/`.concat(FILE_NAME), header);

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

function deleteImage(fileName, callback) {
  s3Client.del(fileName)
    .on('response', (res) => {
      console.log('File deleted on S3 for filename: %s, status: %s', fileName, res.statusCode);
      callback();
    }).on('error', (error) => {
      console.log('Problem deleting file on S3: %s', error.message);
      callback(error);
    }).end();
}

function getChefRating(reviews) {
  const LENGTH = reviews.length;
  return (
    _(reviews).groupBy('chef')
      .map(obj => ({
        overall: parseFloat(_.sumBy(obj, 'overall') / LENGTH).toFixed(2),
        food: parseFloat(_.sumBy(obj, 'food') / LENGTH).toFixed(2),
        value: parseFloat(_.sumBy(obj, 'value') / LENGTH).toFixed(2),
        service: parseFloat(_.sumBy(obj, 'service') / LENGTH).toFixed(2),
        hygiene: parseFloat(_.sumBy(obj, 'hygiene') / LENGTH).toFixed(2),
      })
      )
      .value()[0]
  );
}

function getChefReviews(reviews) {
  return (reviews.map(obj => ({
    name: obj.user.firstName,
    description: obj.comment && obj.comment,
    date: obj.createdAt
  })
));
}


module.exports.imageUploader = imageUploader;
module.exports.deleteImage = deleteImage;
module.exports.getChefRating = getChefRating;
module.exports.getChefReviews = getChefReviews;