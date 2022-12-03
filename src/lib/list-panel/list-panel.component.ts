import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DgraphDataProvider, DgraphService, QueryGen} from "@solenopsys/lib-dgraph";

import {firstValueFrom} from "rxjs";

@Component({
  selector: 'fui-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css']
})
export class ListPanelComponent implements OnInit {
  scope!: any;
  items = {};
  dp!: DgraphDataProvider;
  tableKey!: string;
  module!: string;

  constructor(private route: ActivatedRoute, private draph: DgraphService, private router: Router ) {
  }

  ngOnInit(): void {
    this.module = this.route.snapshot.url[0].path;
    this.route.params.subscribe((params: any) => {
      console.log('PARAMS CHANGED');
      this.tableKey = params.table;
    });
    this.dp = new DgraphDataProvider(this.draph, this.module + '.scope');
  }

  scopeChange() {

    const fromIds = Object.values(this.items).map((obj: any) => obj.uid);
    console.log('IDS', fromIds);
    const query = QueryGen.multiLinkUpdate(fromIds, 'scope', this.scope.uid);
    firstValueFrom(this.draph.mutate(query)).then(res => {
      console.log('UPDATE RES', res);
    });


  }
}
