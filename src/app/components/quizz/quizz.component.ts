import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { FieldType } from 'src/app/interfaces/answer.interface';
import { Question } from 'src/app/interfaces/question.interface';
import { QuizzState } from 'src/app/interfaces/quizz-state.interface';
import { QuizzService } from 'src/app/services/quizz.service';


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzComponent {
  public state$: BehaviorSubject<QuizzState>;
  public form: FormGroup = new FormGroup({});

  public questions$: Observable<Question[]>;
  public questionsLength$: Observable<number>;
  public currentQuestionIndex$: Observable<number>;
  public showResults$: Observable<boolean | undefined>;

  constructor(private quizzService: QuizzService, fb: FormBuilder) {
    this.state$ = this.quizzService.state$;
    this.questions$ = this.quizzService.state$.pipe(map(state => state.questions), tap(questions => this.updateFormGroup(questions)));
    this.questionsLength$ = this.quizzService.state$.pipe(map(state => state.questions.length));
    this.currentQuestionIndex$ = quizzService.state$.pipe(map(state => state.currentQuestionIndex + 1));
    this.showResults$ = quizzService.state$.pipe(map(state => state.showResults));
  }

  updateFormGroup(questions: Question[]): void {
    questions.forEach((question, i) => {
      this.form.addControl(`question${ i + 1 }`, new FormControl(null, Validators.required))
    })
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.state$.next({...this.state$.value, showResults: true})
  }
}
