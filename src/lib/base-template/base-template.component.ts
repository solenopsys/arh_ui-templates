import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cluster, ClusterState, SelectCluster} from '@solenopsys/fl-clusters';
import {MenuItemData} from "@solenopsys/ui-navigate";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {ModulesService} from "@solenopsys/fl-globals";
import {Router} from "@angular/router";
import {ResourceData} from "@solenopsys/ui-controls";
import {InterfaceState, TopToolbarData} from "../interface.store";


@Component({
  selector: 'ui-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.scss'],
})
export class BaseTemplateComponent  {


  mobileMenu = false;
  title = 'solenopsys';

  @Select(InterfaceState.getTopPanel) topPanel$!: Observable<TopToolbarData>;
  @Select(InterfaceState.getTopPanelTabs) topPanelTabs$: Observable<{id:string,title:string}[]>;

  @Input()
  menu: MenuItemData[] = [];



  tabs$!: Observable<{ id: string, title: string }[]>;


  constructor(private cs: ColorSchemesService,
              private elementRef: ElementRef,
              private router: Router,
              private store: Store,
              private modules: ModulesService,

  ) {





    console.log("INIT COLORS", this.elementRef.nativeElement.style)
    cs.initColors(this.elementRef.nativeElement.style);
  }



  showMenu() {
    console.log('OK SHOW');
    this.mobileMenu = true;
  }

  selectCluster(host: string) {
    this.store.dispatch(new SelectCluster(host));
  }
}

