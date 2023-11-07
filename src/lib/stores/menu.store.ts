import {MenuItemData} from "@solenopsys/ui-navigate";
import {Injectable} from "@angular/core";
import {Action, createSelector, State, StateContext, Store} from "@ngxs/store";
import {patch} from "@ngxs/store/operators";
import {Navigate} from "@ngxs/router-plugin";
import {firstValueFrom} from "rxjs";

export type MenuConfig = {
    current: string,
    items: MenuItemData[],

}

export type MenuConfigData = {
    data: { [dataKey: string]: MenuConfig },
    current: string
    visible: boolean
}

export interface MenuLoader {
    load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]>;
}


export interface MenuLoaderProvider {
    load(dataKey: string): Promise<MenuItemData[]>
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

export class HideComponent {
    static readonly type = "[Menu] Hide";

    constructor(public menuId: string) {
    }
}

export class SelectMenuItem {
    static readonly type = "[Menu] Select Menu Item";

    constructor(public menuId: string, public itemId: string) {
    }
}

export class AddProvider {
    static readonly type = "[Menu] Add Provider";

    constructor(public name: string,public provider: MenuLoaderProvider) {
    }
}

export class AddProviderMapping {
    static readonly type = "[Menu] Add Provider Mapping";

    constructor(public dataKey: string,public dataProviderName: string) {
    }
}


export class MenuStateModel {
    configs: { [menuId: string]: MenuConfigData }
    dataProviders: { [name: string]: MenuLoaderProvider }
    providerMapping: { [dataKey: string]: string }
}


@State<MenuStateModel>(
    {
        name: 'menu',
        defaults: {
            configs: {},
            dataProviders: {},
            providerMapping: {}
        },
    }
)
@Injectable()
export class MenuState {

    constructor( private store: Store) {
    }

    static getMenuConfig(menuId: string) {
        return createSelector([MenuState], (state: MenuStateModel) => {
            const config = state.configs[menuId];
            return config.data[config.current];
        });
    }

    static getProvider(providerName: string) {
        return createSelector([MenuState], (state: MenuStateModel) => {
            return state.dataProviders[providerName];
        });
    }

    static getProviderName(dataKey: string) {
        return createSelector([MenuState], (state: MenuStateModel) => {
            return state.providerMapping[dataKey];
        });
    }

    async load(dataProviderName: string, dataKey: string): Promise<MenuItemData[]> {
        const dataProvider = await firstValueFrom(this.store.select(MenuState.getProvider(dataProviderName)));
        if (dataProvider) {
            return dataProvider.load(dataKey)
        } else {
            throw new Error("DataProvider not found")
        }
    }

    async loadByKey(dataKey: string): Promise<MenuItemData[]> {
        const dataProviderName = await firstValueFrom(this.store.select(MenuState.getProviderName(dataKey)));

        return await this.load(dataProviderName, dataKey);
    }


    @Action(DataLoadRequest)
    async dataLoad({getState, setState}: StateContext<MenuStateModel>, {menuId, dataKey}: DataLoadRequest) {
        if (dataKey == undefined) {
            throw new Error("dataKey is undefined");
        }

        const noMenuId = getState().configs[menuId] == undefined;
        const noDataKey = noMenuId || getState().configs[menuId].data[dataKey] == undefined;

        if (noMenuId || noDataKey) {
            const res = await this.loadByKey(dataKey);
            const menuBlock = {
                data: patch({
                    [dataKey]: {
                        current: "",
                        items: res
                    }
                }),
                visible:false,
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
                                visible:true,
                                current: dataKey
                            }
                        )
                    })
                }));
        }
    }

    @Action(AddProvider)
    async addProvider({getState, setState}: StateContext<MenuStateModel>, {provider,name}: AddProvider) {
        setState(
            patch({
                dataProviders: patch({
                    [name]: provider
                }),
            })
        );
    }

    @Action(AddProviderMapping)
    async addProviderMapping({getState, setState}: StateContext<MenuStateModel>, {dataKey,dataProviderName}: AddProviderMapping) {
        setState(
            patch({
                providerMapping: patch({
                    [dataKey]:dataProviderName
                }),
            })
        );
    }

    @Action(AddComponent)
    async addComponent({getState, setState}: StateContext<MenuStateModel>, {menuId}: AddComponent) {
        setState(
            patch({
                configs: patch({
                    [menuId]: {data: {}, current: "",visible:true}
                }),
            })
        );
    }

    @Action(HideComponent)
    async hideCompoent({getState, setState}: StateContext<MenuStateModel>, {menuId}: AddComponent) {
        setState(
            patch({
                configs: patch({
                    [menuId]: patch({visible:false})
                }),
            })
        );
    }

    @Action(SelectMenuItem)
    async selectMenuItem({getState, setState}: StateContext<MenuStateModel>, {menuId, itemId}: SelectMenuItem) {

        const currentData = getState().configs[menuId].current;
        setState(
            patch({
                configs: patch({
                    [menuId]: patch({data: patch({[currentData]: patch({current: itemId})})})
                })
            })
        );
        this.store.dispatch(new Navigate([itemId]));
    }


}