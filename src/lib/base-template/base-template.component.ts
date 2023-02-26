import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cluster, ClusterState, SelectCluster} from '@solenopsys/fl-clusters';
import {MenuItemData} from "@solenopsys/ui-navigate";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {ModulesService} from "@solenopsys/fl-globals";
import {Router} from "@angular/router";


@Component({
  selector: 'ui-base-template',
  templateUrl: './base-template.component.html',
  styleUrls: ['./base-template.component.css'],
})
export class BaseTemplateComponent implements OnInit {


  mobileMenu = false;
  title = 'solenopsys';
  @Select(ClusterState.getCurrent) current$!: Observable<Cluster>;
  @Select(ClusterState.getClusters) clusters$!: Observable<Cluster[]>;

  @Input()
  menu: MenuItemData[] = [];



  tabs$!: Observable<{ id: string, title: string }[]>;


  constructor(private cs: ColorSchemesService,
              private elementRef: ElementRef,
              private router: Router,
              private store: Store,
              private modules: ModulesService,
  ) {





    cs.initColors(this.elementRef.nativeElement.style);
  }

  ngOnInit(): void {


    this.tabs$ = this.clusters$.pipe(map((clusters: Cluster[]) => {
      return clusters?.map(item => {
        return {id: item.host, title: item.title};
      });
    }));
  }

  showMenu() {
    console.log('OK SHOW');
    this.mobileMenu = true;
  }

  selectCluster(host: string) {
    this.store.dispatch(new SelectCluster(host));
  }
}

