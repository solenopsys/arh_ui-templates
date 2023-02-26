import {Component, ElementRef, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ModulesService} from "@solenopsys/fl-globals";
import {Cluster, ClusterState} from "@solenopsys/fl-clusters";
import {Observable} from "rxjs";
import {MenuItemData} from "@solenopsys/ui-navigate";

@Component({
  selector: 'hyperconverged-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BootstrapComponent implements OnInit {

  @Select(ClusterState.getCurrent) current$!: Observable<Cluster>;

  @Input()
  menu: MenuItemData[] = [];



  private readonly pluginMenu = {
    "name": "Plugins",
    "link": "/plugins",
    "icon": "/assets/icons/04-Programing-Apps-Websites/12-Apps/app-window-layout.svg"
  };

  constructor(private cs: ColorSchemesService,
              private elementRef: ElementRef,
              private router: Router,
              private store: Store,
              private modules: ModulesService,
              @Inject('single_start') public singleStart,
              @Inject('menu') private $menu:Observable<any>
  ) {
    console.log("BOOTSTRAP singleStart: "+singleStart)

    $menu.subscribe(menu=>{
      this.menu=menu
    })

    // this.current$.pipe().subscribe(cluster=>{
    //   this.menu = [];
    //   if (singleStart) { //todo remove from this place to frontend


    //   } else { //todo remove from this place to frontend
    //     this.menu.push(this.pluginMenu);
    //     const menuJobs: Promise<any> [] = []
    //     modules.loadModules("http://"+cluster.host).then((names: string[]) => {
    //       console.log("LOAD MODULES")
    //       names.forEach(name => {
    //         menuJobs.push(modules.loadModuleMenu(name));
    //       });
    //       Promise.all(menuJobs).then((resArray: any[]) => {
    //         console.log('RES', resArray);
    //         resArray.forEach(sub => {
    //           this.menu.push(...sub);
    //         })
    //       })
    //     });
    //   }
    // })


  }

  ngOnInit(): void {
  }
}
