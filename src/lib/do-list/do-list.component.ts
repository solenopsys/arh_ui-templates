import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ui-do-list",
  templateUrl: "./do-list.component.html",
  styleUrls: ["./do-list.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class DoListComponent implements OnInit {

  list: { title: string, link: string }[] = [
    { title: "Download a platform to simplify the development of your projects.",link:"bla" },
    { title: "Create your project and find: investors, team, clients.",link:"bla" },
    { title: "Protect and monetize your intellectual property.",link:"bla" },
    { title: "Invest in venture projects and intellectual property.",link:"bla" },
    { title: "Buy, sell and offer your services.",link:"bla" },
    { title: "Participate in the creation of new technological infrastructure.",link:"bla" },
  ];


  constructor() {
  }

  ngOnInit(): void {
  }
}
