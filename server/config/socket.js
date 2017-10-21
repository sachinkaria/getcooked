/**
 * Module dependencies.
 */
const ss = require('socket.io-stream');
// const aws = require('./aws');
const uuid = require('node-uuid');
const progress = require('progress-stream');

/**
 * Module socket function.
 */
exports.initialiseSocket = initialiseSocket;

function initialiseSocket(io) {
  io.on('connection', (socket) => {

    function sendSuccess(video) {
      socket.emit('upload-video:success', {video});
    }

    function sendProgress(progress) {
      socket.emit('upload-video:progress', {progress});
    }

    function sendError(error) {
      socket.emit('upload-video:error', {error});
    }

    // ss(socket).on('upload-video', (inputStream, video) => {
    //   const propertyId = video.propertyId;
    //   const videoId = uuid.v4();
    //   const name = `${propertyId}/video-${videoId}.${video.type}`;
    //
    //   const progressHandler = progress({
    //     length: video.length,
    //     time: 100
    //   }).on('progress', (progress) => {
    //     sendProgress(progress.percentage);
    //   });
    //
    //   const stream = inputStream.pipe(progressHandler);
    //
    //   aws.s3.uploadMultiPartVideo(name, video.length, video.mimeType, stream, (data) => {
    //     if (data.status === 'completed') {
    //       // Get the right file location in dev and test mode
    //       // Due to fakes3 limitation (not implemented)
    //       // https://github.com/jubos/fake-s3/blob/8f7ba5512acba8072654dc7d8964a9a5bebce8a9/lib/fakes3/xml_adapter.rb#L214
    //       if (process.env.NODE_ENV !== 'production') {
    //         data.location = `http://localhost:10001/bungaloow-dev/${name}`;
    //       }
    //
    //       sendSuccess({
    //         name,
    //         videoId,
    //         video: data.location
    //       });
    //     } else if (data.status === 'error') {
    //       sendError(data.error);
    //     }
    //   });
    // });
  });
}
