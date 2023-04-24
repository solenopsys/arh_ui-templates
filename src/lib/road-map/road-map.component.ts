import { Component, OnInit, ViewEncapsulation } from "@angular/core";

const STAGES_COUNT = 24;

@Component({
  selector: "ui-road-map",
  templateUrl: "./road-map.component.html",
  styleUrls: ["./road-map.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoadMapComponent implements OnInit {


  stages: { n: number, users: number } [] = [];
  milestones: {} = {
    1: [
      { description: "0.1 version SoftConverged" },
      { description: "SolChain" },
      { description: "consept HardConverged" },
      { description: "portal Solenopsys" }
    ]
  };


  constructor() {
  }


  ngOnInit(): void {
    let currentUserCount = 1;
    for (let i = 0; i < STAGES_COUNT; i++) {
      let n = i + 1;

      this.stages.push({  users: currentUserCount, n });
      currentUserCount = currentUserCount * 2;
    }
  }
}
