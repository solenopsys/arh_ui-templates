import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'fui-info-panel',
    templateUrl: './info-panel.component.html',
    styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {
    formData = {};
//    public model!: FormModelService;

    constructor() {
    }

    ngOnInit(): void {
    }

}
