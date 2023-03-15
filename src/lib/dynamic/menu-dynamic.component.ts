import {Component, Input, ViewEncapsulation} from '@angular/core';
import {DynamicAbstract} from "@solenopsys/ui-utils";
import {DataLoadRequest, MenuConfig, MenuState, MenuStateModel} from "../stores/menu.store";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
    selector: 'ui-menu-dynamic',
    templateUrl: './menu-dynamic.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class MenuDynamicComponent implements DynamicAbstract {

    key

    config$:Observable<MenuConfig>;

    constructor(private store: Store) {
        this.config$ = this.store.select(MenuState.getBlockByKey(this.key));
    }



     setLoadFrom(loadFrom: { providerName: string, key: string }) {
        console.log("CONFIGURATE MENU", loadFrom)
       this.store.dispatch(new DataLoadRequest(loadFrom.providerName, 'menu', loadFrom.key));
    }
}
