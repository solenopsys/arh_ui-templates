import {Selector, State} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {TabsState} from "@solenopsys/ui-navigate";


export type TopToolbarData = {
    show: boolean,

    tabsState: TabsState
}

export type SideToolbarData = {
    show: boolean,

    tabsState: TabsState
}

export type PanelConfig = {
    show: boolean,
    width: number,
    component: any,
    dataProvider: any
}

export class InterfaceStateModel {
    topToolbar: TopToolbarData
    // leftToolbar?: SideToolbarData
    // leftPanel?: PanelConfig
    // rightToolbar?: SideToolbarData
    // rightPanel?: PanelConfig
}

@State<InterfaceStateModel>({
    name: 'interface',
    defaults: {

        topToolbar: {
            show: true,
            tabsState:{
                current: 'resources',
                tabs: [
                    {id: 'resources', title: 'Resources'},
                    {id: 'processes', title: 'Processes'},
                    {id: 'goals', title: 'Goals'},]
            }
        }
    }
})
@Injectable()
export class InterfaceState {
    @Selector()
    static getTopPanel(state: InterfaceStateModel): TopToolbarData {
        return state.topToolbar;
    }

    @Selector()
    static getTopPanelTabs(state: InterfaceStateModel): { id: string, title: string }[] {
        return state.topToolbar.tabsState.tabs;
    }

    @Selector()
    static getTopPanelCurrent(state: InterfaceStateModel): { id: string, title: string }[] {
        return state.topToolbar.tabsState.tabs;
    }
}