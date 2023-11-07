import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DataItemInterface, DataPageConfig, DgraphService} from "@solenopsys/fl-dgraph";
import {firstValueFrom, Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {GridState} from "../../table-page/table.store";

interface UIdMap {
    [key: string]: string;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

@Component({
    selector: 'ui-form-panel',
    templateUrl: './form-panel.component.html',
    styleUrls: ['./form-panel.component.scss']
})
export class FormPanelComponent implements OnInit {
    formData = {};
    formDataBefore = {};
    tableKey!: string;
    itemId!: string;
    module!: string;
    conf: DataPageConfig;

    messages = [];
    dataListInterface!: DataItemInterface;

    printChanged() {
        console.log('FORM DATA', this.formData);
    }

    constructor(private route: ActivatedRoute, private draph: DgraphService, private store: Store, private router: Router, private injector: Injector) {
    }

    ngOnInit(): void {
        this.load()
    }

    async load() {
        this.module = this.route.snapshot.url[0].path;
        this.tableKey = this.route.snapshot.parent.url[0].path;

        this.conf = await firstValueFrom(this.store.select(GridState.getByKey(this.tableKey)));
        this.dataListInterface = this.injector.get(this.conf.dataProvider) as DataItemInterface;

        this.route.params.subscribe((params: any) => {
            this.itemId = params.id;

            if (this.itemId) {
                console.log('CONF', this.conf, this.tableKey);


                this.dataListInterface.loadOne(this.itemId, this.conf).then(data => {
                    console.log("LOAD DATA", data)
                    this.formData = data;
                    this.formDataBefore = clone(data);
                });
            }
        });
    }


    saveForm() {
        firstValueFrom(this.dataListInterface.save(this.itemId, this.formData, this.formDataBefore, this.conf)).then((result: {
            code: string,
            uids?: UIdMap
        }) => {
            const currentDate = Date.toString()
            if (result.code === 'Success') {
                console.log('NAVIGATE', result);
                // @ts-ignore
                if (result.uids.x) {
                    // @ts-ignore
                    this.router.navigate(['../', result.uids.x], {relativeTo: this.route});
                }

                // @ts-ignore
                this.messages.push({type: 'Saved', time: currentDate});

            } else {
                // @ts-ignore
                this.messages.push({type: 'Error', time: currentDate});
                console.error(result);
            }
        });
    }


}
