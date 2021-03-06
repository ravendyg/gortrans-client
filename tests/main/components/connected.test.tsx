import * as React from 'react';

import * as sinon from 'sinon';
import { assert } from 'chai';
import { mount } from 'enzyme';

import { combineReducers, createStore } from 'redux';
import { IReduxState, IStore } from '../../../src/types/state';
import { ConnectionAction } from '../../../src/types/action-types';
import { Connected } from '../../../src/components/connected';

interface IPops {
  store: IStore;
}
interface IState {
  socket: SocketIOClient.Socket | null;
}

const
  Store: any = createStore(
    combineReducers({
      apiConnection: function (state: any = { socket: null, error: null }, action: any) {
        return action.type === ConnectionAction.CONNECTED
          ? {
            socket: action.payload.data,
            error: null
          }
          : state
          ;
      }
    })
  ),
  subStub = sinon.stub(),
  changeStub = sinon.stub(),
  unsubscribeStub = sinon.stub(),
  oldSubscribe = Store.subscribe
  ;

Store.subscribe = (cb: any) => {
  subStub();
  const unsub = oldSubscribe(cb);
  return unsubscribeStub.callsFake(() => {
    unsub();
  });
};

class Component extends Connected<IPops, IState, IReduxState> {

  mapState(newStore: IReduxState): IState | null {
    changeStub(newStore.apiConnection);
    return { socket: newStore.apiConnection.socket };
  }

  render() {
    return(<div></div>);
  }

}

const component = mount(<Component store={Store} />);

describe('<Connected>', () => {

  it('subscribes to store changes', () => {
    sinon.assert.calledOnce(subStub);
  });

  it('calls storeChangeCb with new state', done => {
    changeStub.resetHistory();
    Store.dispatch({
      type: ConnectionAction.CONNECTED,
      payload: { data: 'data' }
    });
    setTimeout(() => {
      try {
        assert.deepEqual(component.state(), { socket: 'data'});
        sinon.assert.calledWith(changeStub, sinon.match({ socket: 'data', error: null }));
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('calls _unsubscribe when component will unmount', () => {
    unsubscribeStub.resetHistory();
    component.unmount();
    sinon.assert.calledOnce(unsubscribeStub);
  });

});
