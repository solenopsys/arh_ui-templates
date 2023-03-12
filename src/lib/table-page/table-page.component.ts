import {Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {DataPageConfig} from "@solenopsys/fl-dgraph";
import {Navigate} from "@ngxs/router-plugin";
import {Observable, Subscription} from "rxjs";
import {DeleteRowDialog, GridState, LoadGridConf} from "./table.store";
import {IdService} from "@solenopsys/fl-globals";
import {DeleteRow,  InitGroup, RowsGroup} from "@solenopsys/ui-lists";
import {COMMANDS_MAP} from "../commands";
import {DialogConfig} from "@solenopsys/ui-modals";


@Component({
  selector: 'ui-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, OnDestroy {
  conf$: Observable<any>;
  tableKey!: string;
  commands: any[] = [];
  subscription: Subscription;

  visibleDialog = false;

  deleteAction

  dialogConfig: DialogConfig = {
    text: "Удалить из базы данных",
    buttons: [
      {title: "Да", command: () => this.deleteAction},
    ]
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private injector: Injector,
    private actions$: Actions,
    idService: IdService,
    @Inject('mod_name') private module: string
  ) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.tableKey = params.table;
      this.initTable();
    });

    this.actions$
      .pipe(ofActionDispatched(DeleteRowDialog))
      .subscribe((payload) => {
        console.log('PL', payload)
        this.visibleDialog = true
        this.deleteAction = new DeleteRow(payload.key, payload.uid);

      })
  }


  private initTable() {
    let dataPageConfig = this.store.selectSnapshot(GridState.getByKey(this.tableKey));
    if (!dataPageConfig) {
      console.log("RUN-------",)
      const tables = this.injector.get('tables');
      const conf: DataPageConfig = tables[this.tableKey];
      this.store.dispatch(new LoadGridConf(this.tableKey, conf))

      this.conf$ = this.store.select(GridState.getByKey(this.tableKey));
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.conf$.subscribe(
        (conf: DataPageConfig) => {
          this.store.dispatch(new InitGroup(this.tableKey, this.newGroup(conf)))
        });
    }
  }

  private newGroup(conf: DataPageConfig) {
    this.commands = [];
    conf.commands.forEach((key: string) => {
      this.commands.push(COMMANDS_MAP[key])
    });
    const columnsWidthDefault={}
    conf.fields.forEach((field:any)=>columnsWidthDefault[field.key]=250)
    const newGroup: RowsGroup = {
      rows: [],
      checked: [],
      commands: this.commands,
      //@ts-ignore todo fix this
      dataInterface: conf.dataProvider ,
      tableKey: this.tableKey,
      module: this.module,
      //@ts-ignore todo fix this
      dataConf: conf,
      columnsWidths:columnsWidthDefault
    };
    return newGroup;
  }


  add() {
    this.store.dispatch(new Navigate([this.module, this.tableKey, 'new', 'form']));
  }
}
