import {
  UPLOAD_PHOTO,
  UPDATE_USER,
  GET_BOOKINGS,
  GET_INBOX,
  GET_CONVERSATION,
  PROCESSING_FILE_UPLOAD,
  COMPLETED_FILE_UPLOAD
} from '../actions/types';

const INITIAL_STATE = { bookings: [], inbox: [], conversation: [], data: null, processing_file_upload: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return { ...state, data: action.payload };
    case UPDATE_USER:
      return { ...state, data: action.payload };
    case GET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case GET_INBOX:
      return { ...state, inbox: action.payload };
    case GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case PROCESSING_FILE_UPLOAD:
      return { ...state, processing_file_upload: true };
    case COMPLETED_FILE_UPLOAD:
      return { ...state, processing_file_upload: false };
    default:
      break;
  }

  return state;
}
