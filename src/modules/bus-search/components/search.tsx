import * as React from 'react';

import { SearchInput } from './input';
import { IBusListAction } from '../types';
import { IStoreProps } from '../../../types';

interface ISearchState {}

interface ISearchProps extends IStoreProps {
  busListAction: IBusListAction;
}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export class Search extends React.Component<ISearchProps, ISearchState> {
  render() {
    return(
      <div className="search__wrapper" style={style}>
        <SearchInput
          emit={this.props.busListAction.updateQuery}
          store={this.props.store}
        />
      </div>
    );
  }
}
