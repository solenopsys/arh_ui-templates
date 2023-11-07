import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {AddComponent, MenuConfig, MenuState, SelectMenuItem} from "../stores/menu.store";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {DynamicAbstract} from "./dynamic.abstract";

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
        console.log("MENU INIT", this.id);
        this.store.dispatch(new AddComponent(this.id));
        this.menuData$ = this.store.select(MenuState.getMenuConfig(this.id));
    }

    navigateByClick(path: string) {
        this.store.dispatch(new SelectMenuItem(this.id,path) );
    }
}
