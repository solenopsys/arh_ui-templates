import {Component, Input} from '@angular/core';
import {DynamicAbstract} from "@solenopsys/ui-utils";
import {DataLoadRequest, MenuState, MenuStateModel} from "../stores/menu.store";
import {Store} from "@ngxs/store";

@Component({
    template: '<ng-container *ngIf="config$ | async; let config "> ' +
        '<ui-menu  [data]="config.items" ' +
        '[current]="config.current" ' +
        '(clickEvent)="events.emit($event)"></ui-menu>' +
        '</ng-container>',
})
export class MenuDynamicComponent implements DynamicAbstract {

    key

    config$;

    constructor(private store: Store) {
        this.config$ = this.store.select(MenuState.getBlockByKey(this.key));
        this.store.dispatch(new DataLoadRequest('menu', 'menu', this.key));
    }


    @Input("loadFrom")
    set setLoadFrom(loadFrom: { providerName: string, key: string }) {
       this.store.dispatch(new DataLoadRequest(loadFrom.providerName, 'menu', loadFrom.key));
    }
}
