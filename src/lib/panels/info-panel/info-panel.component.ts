import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {
    formData = {};
//    public model!: FormModelService;

    constructor() {
    }

    ngOnInit(): void {
    }

}
