import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Tab, TabsState, TopPaneConfig} from "@solenopsys/ui-navigate";
import {patch} from "@ngxs/store/operators";


export type TopToolbarData = {
    show: boolean,

    topPaneConfig: TopPaneConfig
}

export type SideToolbarData = {
    show: boolean,

    tabsState: TabsState
}

export type PanelConfig={
    component: string,
    id: string //unique id component
}



export class InterfaceStateModel {
    topToolbar: TopToolbarData
   //  leftToolbar?: SideToolbarData
     leftPanel?: PanelConfig
    // rightToolbar?: SideToolbarData
    // rightPanel?: PanelConfig
}

export class SetTabs {
    static readonly type = "[Interface] Set Tabs";

    constructor(public tabs: Tab[]) {
    }
}

export class SelectTab {
    static readonly type = "[Interface] Select Tab";

    constructor(public tab: string) {
    }
}

export class SetLeftPanel {
    static readonly type = "[Interface] Set Left Panel";

    constructor(public panelConfig: PanelConfig) {
    }
}


@State<InterfaceStateModel>({
    name: 'interface',
    defaults: {

        topToolbar: {
            show: true,
            topPaneConfig: {
                tabsState: {
                    current: "",
                    tabs: []
                }
                , actions: []
            }

        }
    }
})
@Injectable()
export class InterfaceState {

    @Selector()
    static getTop(state: InterfaceStateModel): TopPaneConfig {
        console.log("SELETOR WORK", state.topToolbar.topPaneConfig)
        return state.topToolbar.topPaneConfig;
    }

    @Action(SetTabs)
    setTabs({setState}: StateContext<InterfaceStateModel>, {tabs}: SetTabs) {
        setState(
            patch({
                topToolbar: patch(
                    {
                        topPaneConfig: patch(
                            {tabsState: patch({tabs: tabs})})
                    })
            })
            //   topToolbar.topPaneConfig.tabsState.tabs: tabs
        );
    }

    @Action(SelectTab)
    selectTab({setState}: StateContext<InterfaceStateModel>, {tab}: SelectTab) {
        setState(
            patch({
                topToolbar: patch(
                    {topPaneConfig: patch({tabsState: patch({current: tab})})})
            })
        );

    }

    @Action(SetLeftPanel)
    setLeftPanel({setState}: StateContext<InterfaceStateModel>, {panelConfig}: SetLeftPanel) {
        setState(
            patch({
                leftPanel: panelConfig
            })
        );
    }

}