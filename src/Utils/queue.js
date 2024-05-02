import {store} from '../app/store';
import {shouldProcessItem} from './util';
import {postsApiSlice} from '../Screens/Feed/api/postsApiSlice';
import {readImageDataFromUrl, removeFromStorage} from './fs';
import {CONCURRENT_UPLOAD_LIMIT} from '../config';
import {
  removeFromDraftData,
  uploadDraftDataStart,
  requeueDraftData,
} from '../Screens/Feed/api/draftSlice';
import {updatePostImages} from '../Screens/Feed/api/postsSlice';
export const processDraftItem = async image => {
  const imageData = await readImageDataFromUrl(image.url);
  const user_id = store.getState()?.persistedReducer?.auth?.data?.id;

  try {
    if (imageData === null || imageData === '' || imageData === undefined) {
      store.dispatch(removeFromDraftData({id: image.id}));
      return;
    }
    store.dispatch(uploadDraftDataStart({id: image.id}));
    const response = await store.dispatch(
      postsApiSlice.endpoints.saveImages.initiate({
        image: `data:image/png;base64,${imageData}`,
        post_id: image.post_id,
        user_id: user_id,
      }),
    );
    store.dispatch(removeFromDraftData({id: image.id}));
    store.dispatch(updatePostImages(response.data.data));
    await removeFromStorage(image.url);
  } catch (e) {
    console.log('Resp', e);
    store.dispatch(requeueDraftData({id: image.id}));
  }
};

export const processDrafts = async () => {
  let should_process = false;
  const drafts = store.getState()?.persistedReducer?.drafts?.data
    ? store.getState()?.persistedReducer?.drafts?.data
    : [];
  const count = drafts.filter(draft => {
    return !(
      draft.upload_started_at === null || draft.upload_started_at === undefined
    );
  }).length;
  for (let i in drafts) {
    should_process =
      shouldProcessItem(drafts[i]) && count <= CONCURRENT_UPLOAD_LIMIT;
    if (should_process) {
      processDraftItem(drafts[i]);
    }
  }
};
