import { Directive, Input } from '@angular/core';
import { AnswerOptionSelection } from 'src/app/interfaces/answer.interface';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() option!: AnswerOptionSelection;
  constructor() { }

}
