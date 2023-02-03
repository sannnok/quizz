import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicInputComponent } from './shared/custom-components/dynamic-input/dynamic-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectComponent } from './shared/custom-components/multiselect/multiselect.component';
import { HighlightDirective } from './shared/directives/highlight.directive';

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
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
