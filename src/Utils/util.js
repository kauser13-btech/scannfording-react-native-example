import {Platform} from 'react-native';
import differenceInSeconds from 'date-fns/differenceInSeconds';

export const QUEUE_TIMEOUT = 60 * 5;
export const UPLOAD_TIMEOUT = 60 * 4;

export const secondsSince = (date, now = new Date()) => {
  return differenceInSeconds(now, new Date(date));
};

export const shouldProcessItem = item => {
  const {upload_started_at} = item;
  if (
    !upload_started_at ||
    upload_started_at === undefined ||
    upload_started_at === null
  ) {
    return true;
  }
  if (upload_started_at && upload_started_at !== undefined) {
    const timePassedSinceUploadStarted = secondsSince(upload_started_at);
    if (timePassedSinceUploadStarted >= UPLOAD_TIMEOUT) {
      return true;
    }
    if (timePassedSinceUploadStarted <= UPLOAD_TIMEOUT) {
      return false;
    }
  }
};

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const delayFunction = ms => new Promise(res => setTimeout(res, ms));
