import { IConfig } from '../types';
import { IStore, IReduxState, IMapState } from '../types/state';
import { BusListSync } from '../types/data-types';
import { IStorageService } from '../types/services';

export function createStorageService(storage: Storage, config: IConfig): IStorageService {

  function getDefaultViewOptions(): IMapState {
    let res: IMapState;
    try {
      const resStr = storage.getItem(config.keys.localViewParams) || '';
      res = JSON.parse(resStr);
      if (!resStr || typeof res !== 'object') {
        throw new Error('bad entry');
      }
    } catch (err) {
      res = {
        lat: config.defaultViewOptions.lat,
        lng: config.defaultViewOptions.lng,
        zoom: config.defaultViewOptions.zoom
      };
    }

    return res;
  }

  function setDefaultViewOptions(viewOptions: IMapState) {
    storage.setItem(config.keys.localViewParams, JSON.stringify(viewOptions));
  }

  // TODO: extract to a provider?
  function watchViewOptions(store: IStore<IReduxState>) {
    let oldState: IMapState;
    store.subscribe(() => {
      const mapState = store.getState().mapState;
      if (mapState !== oldState) {
        oldState = mapState;
        setDefaultViewOptions(oldState);
      }
    });
  }

  function getBusList(): Promise<BusListSync> {
    return Promise.resolve({
      tsp: 0,
      version: '',
      list: []
    });
  }

  function setBusList(info: BusListSync) {
    console.log(info);
  }

  return {
    getDefaultViewOptions,
    watchViewOptions,

    getBusList,
    setBusList
  };
}