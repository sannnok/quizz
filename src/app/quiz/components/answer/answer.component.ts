import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Question } from '../../interfaces/question.interface';
import { QuizzState } from '../../interfaces/quizz-state.interface';
import { PartOpt } from '../../interfaces/utils/utils.interface';
import { QuizzService } from '../../services/quizz.service';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerComponent {
  state$: BehaviorSubject<PartOpt<QuizzState, 'showResults'>>;
  questions$: Observable<Question[]>;

  constructor(private quizzService: QuizzService) {
    this.state$ = this.quizzService.state$;
    this.questions$ = this.quizzService.state$.pipe(map(state => state.questions));
  }
}
