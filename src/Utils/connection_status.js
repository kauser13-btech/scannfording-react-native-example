import { setNetInfo } from '../Screens/Feed/api/netInfoSlice';
import {store} from '../app/store';
import { fetch } from "@react-native-community/netinfo";
export const autoSyncNetInfo = async()=> {
   const info = await fetch();
   await store.dispatch(setNetInfo(info));
}