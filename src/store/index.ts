import { combineReducers, createStore } from 'redux';
// reducers
import { apiConnection } from './connection';
import { createMapState } from './map-state';
import { busList } from './bus-list';
import { appState } from './app-state';
import { translation } from './translation';
import { createBusSearchReducer } from './bus-search';
// interfaces
import { IReduxState } from '../types/state';
import { Store as IStore } from 'redux';
import { IViewStorageService } from '../types/services';
import { IConfig } from '../types';

export function storeFactory(storageService: IViewStorageService, config: IConfig) {
  const
    defViewOptions = storageService.getMapViewOptions(),
    app = combineReducers({
      apiConnection,
      mapState: createMapState(defViewOptions, config),
      busList,
      appState,
      translation,
      busSearch: createBusSearchReducer(config),
    }),
    win: any = window,
    Store = createStore(
      app,
      win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
    ) as IStore<IReduxState>
    ;

  return Store;
}
