import { Directive, Input } from '@angular/core';
import { AnswerOptionSelection } from '../../interfaces/answer.interface';


@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() option!: AnswerOptionSelection;
  constructor() { }

}
