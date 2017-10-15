import { IMapState } from './state';
import { BusListSync } from './data-types';

export interface IAction<T, P> {
  type: T;
  payload: P;
}

export interface IConfig {
  apiVersion: string;
  apiUrl: string;
  mapOptions: {
    minZoom: number;
    maxZoom: number;
    maxBounds: L.LatLngBounds;
  };
  tileProvider: string;
  defaultViewOptions: IMapState;
  defaultBusListSync: BusListSync;
  keys: {
    localViewParams: string;
    busListSync: string;
  };
  syncPeriod: number;
}

export interface ICtor<T> {
  new(...args: any[]): T;
}

export interface IWindowProps {
  win: Window;
}
