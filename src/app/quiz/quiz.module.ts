import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { MultiselectComponent } from './shared/custom-components/multiselect/multiselect.component';
import { DynamicInputComponent } from './shared/custom-components/dynamic-input/dynamic-input.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    QuizzComponent,
    QuestionComponent,
    AnswerComponent,
    MultiselectComponent,
    DynamicInputComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class QuizModule { }
