import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Question } from 'src/app/interfaces/question.interface';
import { QuizzState } from 'src/app/interfaces/quizz-state.interface';
import { QuizzService } from 'src/app/services/quizz.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() step!: number;
  @Input() formGroup!: FormGroup;
  state$: BehaviorSubject<QuizzState>;

  constructor(private quizzService: QuizzService) {
    this.state$ = quizzService.state$;
  }

  onPrevClick() {
    this.quizzService.previousQuestion();
  }

  onNextClick() {
    this.quizzService.nextQuestion();
  }
}
