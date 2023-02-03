import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Question } from 'src/app/interfaces/question.interface';
import { QuizzState } from 'src/app/interfaces/quizz-state.interface';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerComponent {
  state$: BehaviorSubject<QuizzState>;
  questions$: Observable<Question[]>;

  constructor(private quizzService: QuizzService) {
    this.state$ = this.quizzService.state$;
    this.questions$ = this.quizzService.state$.pipe(map(state => state.questions));
  }
}
