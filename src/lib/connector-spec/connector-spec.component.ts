import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'connector-spec',
  templateUrl: './connector-spec.component.html',
  styleUrls: ['./connector-spec.component.css']
})
export class ConnectorSpecComponent {

  spec$:Observable<any>

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.spec$= this.http.get("/assets/standarts/iusb-base.json")
  }
}
