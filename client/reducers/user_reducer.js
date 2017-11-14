import {
  UPLOAD_PHOTO,
  UPDATE_USER,
  BOOKING_LIST,
  GET_BOOKING,
  GET_INBOX,
  GET_CONVERSATION,
  PROCESSING_FILE_UPLOAD,
  COMPLETED_FILE_UPLOAD,
  SENT_BOOKING_REQUEST,
  RESET_BOOKING_REQUEST
} from '../actions/types';

const INITIAL_STATE = { bookings: [], booking: null, inbox: [], conversation: [], data: null, processing_file_upload: false, sent_booking_request: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return { ...state, data: action.payload };
    case UPDATE_USER:
      return { ...state, data: action.payload };
    case BOOKING_LIST:
      return { ...state, bookings: action.payload };
    case GET_BOOKING:
      return { ...state, booking: action.payload };
    case GET_INBOX:
      return { ...state, inbox: action.payload };
    case GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case PROCESSING_FILE_UPLOAD:
      return { ...state, processing_file_upload: true };
    case COMPLETED_FILE_UPLOAD:
      return { ...state, processing_file_upload: false };
    case SENT_BOOKING_REQUEST:
      return { ...state, sent_booking_request: true };
    case RESET_BOOKING_REQUEST:
      return { ...state, sent_booking_request: false };
    default:
      break;
  }

  return state;
}
