import * as React from 'react';
import { Connected } from './connected';
import { IPropsWithAction, MapRouterStateToPanelState } from '../types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './map-wrapper/map-wrapper';
import { Controls } from './controls/controls';
import { IWindowProps, IStoreProps } from '../types';
import { IReduxState } from '../types/state';

import { SidePanel } from './side-panel';

interface IAppState {
  panelContent: JSX.Element | null;
}

export interface IAppProps extends IPropsWithAction, IWindowProps, IStoreProps {
  mapProps: IMapWrapperProps;
  mapRouterStateToPanelState: MapRouterStateToPanelState;
}

export class App extends Connected<IAppProps, IAppState, IReduxState> {

  mapState(): IAppState {
    return {
      panelContent: this.props.mapRouterStateToPanelState(this.props.store)
    };
  }

  render() {
    const
      { actions, mapProps, win } = this.props,
      controls = !this.state.panelContent
        ? <Controls actions={actions} />
        : null
        ,
      sidePanel = this.state.panelContent
        ? (
          <SidePanel
            children={this.state.panelContent}
            closeMe={actions.controlActions.goToRoot}
            slideLength={'0.5s'}
            win={win}
          />
        )
        : null
      ;

    return(
      <div id="wrapper">
        <MapWrapperComponent {...mapProps} />
        {controls}
        {sidePanel}
      </div>
    );
  }

}
