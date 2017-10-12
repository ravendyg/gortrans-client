import * as sinon from 'sinon';
import { IReduxState } from '../src/types/state';

export function storeFactory(_newState?: IReduxState) {
  let state: IReduxState = {
    mapState: {
      lat: '10',
      lng: '11',
      zoom: 12
    },
    apiConnection: {
      socket: null,
      error: null
    }
  };

  if (_newState) {
    _setState(_newState);
  }

  function _setState(newState: IReduxState) {
    state = Object.assign({}, state, newState);
  }

  const
    subscribe = sinon.stub(),
    dispatch = sinon.stub(),
    getState = sinon.stub().returns(state),
    store: any = {
      getState,
      dispatch,
      subscribe,
      _setState,
      _resetAllHistory() {
        subscribe.resetHistory();
        dispatch.resetHistory();
        getState.resetHistory();
      }
    }
    ;

  return store;
}