import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";
import {Action, createSelector, State, StateContext, Store} from "@ngxs/store";
import {patch} from "@ngxs/store/operators";
import {MenuLoaderService} from "./menu-loader.service";

export type MenuConfig = {
    current: string,
    items: MenuItemData[]
}

export type MenuConfigData = {
    data: { [dataKey: string]: MenuConfig },
    current: string
}

export class DataLoadRequest {
    static readonly type = "[Menu] Data Load Request";

    constructor(public menuId: string, public dataKey: string) {
    }
}

export class AddComponent {
    static readonly type = "[Menu] Add Component Storage";

    constructor(public menuId: string) {
    }
}


export class MenuStateModel {
    configs: { [menuId: string]: MenuConfigData }
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

    constructor(private mls: MenuLoaderService, private store: Store) {
    }

    static getMenuConfig(menuId: string) {
        return createSelector([MenuState], (state: MenuStateModel) => {
            const config = state.configs[menuId];
            return config.data[config.current];
        });
    }


    @Action(DataLoadRequest)
    async dataLoad({getState, setState}: StateContext<MenuStateModel>, {menuId, dataKey}: DataLoadRequest) {
        if (dataKey == undefined) {
            throw new Error("dataKey is undefined");
        }

        const noMenuId = getState().configs[menuId] == undefined;
        const noDataKey = noMenuId || getState().configs[menuId].data[dataKey] == undefined;

        if (noMenuId || noDataKey) {
            const res = await this.mls.loadByKey(dataKey);
            const menuBlock = {
                data: patch({
                    [dataKey]: {
                        current: "",
                        items: res
                    }
                }),
                current: dataKey
            };
            setState(
                patch({
                    configs: patch({
                        [menuId]: patch(menuBlock)
                    })
                })
            );
        } else {
            setState(
                patch({
                    configs: patch({
                        [menuId]: patch(
                            {
                                current: dataKey
                            }
                        )
                    })
                }));
        }
    }

    @Action(AddComponent)
    async addComponent({getState, setState}: StateContext<MenuStateModel>, {menuId}: AddComponent) {
        setState(
            patch({
                configs: patch({
                    [menuId]: {data: {}, current: ""}
                })
            })
        );
    }


}