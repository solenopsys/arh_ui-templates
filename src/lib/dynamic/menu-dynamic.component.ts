import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicAbstract} from "@solenopsys/ui-utils";
import {AddComponent, DataLoadRequest, MenuConfig, MenuState} from "../stores/menu.store";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
    selector: 'ui-menu-dynamic',
    templateUrl: './menu-dynamic.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class MenuDynamicComponent implements DynamicAbstract,OnInit {


    @Input()
    id: string;

    menuData$: Observable<MenuConfig>;

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.store.dispatch(new AddComponent(this.id));
        this.menuData$ = this.store.select(MenuState.getMenuConfig(this.id));
    }
}
