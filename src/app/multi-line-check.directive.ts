import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appMultiLineCheck]'
})
export class MultiLineCheckDirective implements AfterViewInit {

  @Output() multiLineCheck = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    console.log('Checking for multiline callled');
  }
  ngOnInit() {
   
    
  }

  ngAfterViewInit() {
    console.log('Checking for multiline');
    
    const element = this.el.nativeElement;
    const style = getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const height = element.clientHeight;
    const lines = height / lineHeight;

    this.multiLineCheck.emit(lines > 1);
  }
}
