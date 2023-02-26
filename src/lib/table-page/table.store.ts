import {Action, createSelector, State, StateContext} from "@ngxs/store";
import {Injectable, Injector} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {DataPageConfig} from "@solenopsys/fl-dgraph";

export class GridStateModel {
  constructor(public configs: { [key: string]: DataPageConfig }) {
  }
}

export class LoadGridConf {
  static readonly type = '[Grid] Load Conf';

  constructor(public key: string, public conf: DataPageConfig) {
  }
}

export class LoadDataBatch {
  static readonly type = '[Grid] Load Data Batch';

  constructor(public key: string) {
  }
}

export class DeleteRowDialog {
  static readonly type = '[Grid] Delete Item';

  constructor(public key: string, public uid: string) {
  }
}


@State<GridStateModel>({
  name: 'grid',
  defaults: {
    configs: {},
  }
})
@Injectable()
export class GridState {
  constructor() {
  }

  static getByKey(key: string) {
    return createSelector([GridState], (state: GridStateModel) => {
      return state.configs[key];
    });
  }

  @Action(LoadGridConf)
  async load({getState, setState}: StateContext<GridStateModel>, {key, conf}: LoadGridConf) {
    console.log("CONF",conf);
    setState(patch({
      configs: patch({[key]: conf})
    }));
  }
}
