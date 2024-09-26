import {store,persistor} from './store'
import { resetAdmin } from './tokenslice' 

export const clearAdminPersistedData = () => {
    store.dispatch(resetAdmin());
    persistor.purge();
  };
  