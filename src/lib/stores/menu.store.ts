import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";
import {Action, createSelector, State, StateContext} from "@ngxs/store";
import {patch} from "@ngxs/store/operators";
import {MenuLoaderService} from "./menu-loader.service";

export type MenuConfig = {
    current: string,
    items: MenuItemData[]
}

export class DataLoadRequest {
    static readonly type = "[Panel] Data Load Request";

    constructor(public dataProviderName: string, type: string, public dataKey: string) {
    }
}

export class MenuStateModel {
    configs: { [key: string]: MenuConfig }
}


@State<MenuStateModel>(
    {
        name: 'menu',
        defaults: {
            configs: {}
        }
    }
)
@Injectable()
export class MenuState {

    constructor(private mls: MenuLoaderService) {
    }

    static getBlockByKey(key: string) {
        return createSelector([MenuState], (state: MenuStateModel) => {
            return state.configs[key];
        });
    }

    @Action(DataLoadRequest)
    async dataLoad({getState, setState}: StateContext<MenuStateModel>, {dataKey, dataProviderName}: DataLoadRequest) {
        const res = await this.mls.load(dataProviderName, dataKey);
        setState(
            patch({
                configs: {[dataKey]: {items: res, current: ""}}
            })
        );
    }
}