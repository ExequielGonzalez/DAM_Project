/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private el: ElementRef) {
   }

   private resaltarLinea(colorBg: string, colorFont: string){
    this.el.nativeElement.style.backgroundColor=colorBg;
    this.el.nativeElement.style.color=colorFont;
   }

   @HostListener('mouseenter') onMouseEnter() {
    this.resaltarLinea('#bbb', 'white');
    this.el.nativeElement.style.cursor='pointer';
   }
   @HostListener('mouseleave') onMouseLeave() {
    this.resaltarLinea('','');
    this.el.nativeElement.style.cursor='none';
  }

}
