import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FieldType } from '../../interfaces/answer.interface';
import { Question } from '../../interfaces/question.interface';
import { QuizzState } from '../../interfaces/quizz-state.interface';
import { PartOpt } from '../../interfaces/utils/utils.interface';
import { QuizzService } from '../../services/quizz.service';

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
  state$: BehaviorSubject<PartOpt<QuizzState, 'showResults'>>;
  isTheAnswerRight$: Observable<boolean>;

  constructor(private quizzService: QuizzService) {
    this.state$ = quizzService.state$;
    this.isTheAnswerRight$ = this.quizzService.state$.pipe(map(state => state.userAnswers[this.state$.value.currentQuestionIndex]));
  }

  onPrevClick() {
    this.quizzService.previousQuestion();
  }

  onNextClick() {
    this.quizzService.nextQuestion();
  }

  checkAnswer({ fieldType }: { fieldType: FieldType }, control: AbstractControl, questionNo: number, ) {
    const rightAnswers: (number | string)[] = this.state$.value.questions[questionNo - 1].correctAnswer;

    let currentValue: (number | string)[] = control.value;
    let isCorrect = rightAnswers.every(correct => currentValue.includes(correct))
                 && currentValue.every(correct => rightAnswers.includes(correct));

    if (fieldType === FieldType.INPUT || fieldType === FieldType.NUMBERINPUT) {
      currentValue = this.state$.value.questions[questionNo - 1].fieldProps.options
        .filter(option => option.value === control.value[0])
        .map(option => option.answerId)

      isCorrect = rightAnswers.some(correct => currentValue.includes(correct));
    }

    this.quizzService.recordUserAnswer(questionNo, isCorrect);
    console.log(this.state$.value.userAnswers)
  }
}
