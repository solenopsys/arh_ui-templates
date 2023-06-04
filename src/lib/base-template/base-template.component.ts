import {Component, ElementRef, Input} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SelectCluster} from '@solenopsys/fl-clusters';
import {MenuItemData, TopPaneConfig} from "@solenopsys/ui-navigate";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {ModulesService} from "@solenopsys/fl-globals";
import {Router} from "@angular/router";
import {InterfaceStateModel, PanelConfig, SelectTab, SetLeftPanel} from "../stores/interface.store";
import {Navigate} from "@ngxs/router-plugin";
import {DataLoadRequest} from "../stores/menu.store";


@Component({
    selector: 'ui-base-template',
    templateUrl: './base-template.component.html',
    styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent {


    mobileMenu = false;
    title = 'solenopsys';


    panTopPane$: Observable<TopPaneConfig>;
    leftPanel$: Observable<PanelConfig>;


    @Input()
    menu: MenuItemData[] = [];


    constructor(private cs: ColorSchemesService,
                private elementRef: ElementRef,
                private router: Router,
                private store: Store,
                private modules: ModulesService,
    ) {
        cs.initColors(this.elementRef.nativeElement.style);
        this.panTopPane$ = this.store.select(state => (state.interface as InterfaceStateModel).topToolbar.topPaneConfig);
        this.leftPanel$ = this.store.select(state => (state.interface as InterfaceStateModel).leftPanel);
    }


    showMenu() {
        console.log('OK SHOW');
        this.mobileMenu = true;
    }

    selectCluster(host: string) {
        this.store.dispatch(new SelectCluster(host));
    }


    selectTab(tab: string) {
        this.store.dispatch(new SelectTab(tab));
        this.store.dispatch(new Navigate([tab]))
        this.store.dispatch(new DataLoadRequest("menuIdBla", tab));
    }
}

