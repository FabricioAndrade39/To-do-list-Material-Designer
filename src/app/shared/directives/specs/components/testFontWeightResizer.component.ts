import { FontWeigthResizerDirective } from './../../fontWeightResizer.directive';
import { Component } from "@angular/core";

@Component({
  imports: [FontWeigthResizerDirective],
  standalone: true,
  template: `<h2 fontWeightResizer="bold">Test Directive</h2>`
})

export class TestFontWeigthResizerDirectiveComponent {}
