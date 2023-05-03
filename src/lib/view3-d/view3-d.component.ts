import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { StlRenderer } from "./test_scene";





@Component({
  selector: "ui-view3-d",
  templateUrl: "./view3-d.component.html",
  styleUrls: ["./view3-d.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class View3DComponent implements  AfterViewInit {
  @ViewChild("3dDraw", { static: true })
  drawElement: ElementRef<HTMLCanvasElement>;
  @ViewChild("3dDraw1", { static: true })
  drawElement1: ElementRef<HTMLCanvasElement>;
  stlRenderer:StlRenderer


  constructor() {
    this.stlRenderer =new StlRenderer();



  }

   animate() {
    requestAnimationFrame( this.animate );
     this.stlRenderer.render();
  }



  ngAfterViewInit(): void {

    this.drawElement.nativeElement.appendChild(this.stlRenderer.renderer.domElement);
 // stlRenderer.loadStl("/assets/3d/usb.STL");
   this.stlRenderer.load3MF("/assets/3d/USB3.3MF");
    this.animate()
  }


}


