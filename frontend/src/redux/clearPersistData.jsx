
import { store, persistor } from './store';
import { reset } from './tokenslice';

export const clearPersistedData = () => {
  store.dispatch(reset()); // Dispatch the reset action
  persistor.purge();
};
