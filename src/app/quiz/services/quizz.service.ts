import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../interfaces/question.interface';
import { BehaviorSubject } from 'rxjs';
import { QuizzState } from '../interfaces/quizz-state.interface';

import { environment } from '../../../environments/environment'
import { PartOpt } from '../interfaces/utils/utils.interface';

enum Direction {
  FORWARD,
  BACKWARD
}

const MOCKED_DATA = '/data/quizz.json';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  public state$ = new BehaviorSubject<PartOpt<QuizzState, 'showResults'>>({
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    questions: [],
    rightAnswersAcc: 0,
    userAnswers: [],
  })

  constructor(private http: HttpClient) {
    this.getQuizz();
  }

  previousQuestion() {
    if (this.state$.value.currentQuestionIndex === 0) return;
    this.turnOver(Direction.BACKWARD);
  }

  nextQuestion() {
    if (this.state$.value.currentQuestionIndex === this.state$.value.questions.length - 1) return;
    this.turnOver(Direction.FORWARD);
  }
    
  getQuizz() {
    this.http.get<Array<Question>>(`${environment.assets}${MOCKED_DATA}`).subscribe(data => this.setQuestions(data))
  }

  calculateCorrectQuestions() {
    const correctAnswerCount = this.state$.value.userAnswers.filter(Boolean).length;
    this.state$.next({ ...this.state$.value, correctAnswerCount })
  }

  recordUserAnswer(questionNo: number, answer: boolean) {
    const userAnswers = this.state$.value.userAnswers.slice();
    userAnswers[questionNo - 1] = answer;
    this.state$.next({ ...this.state$.value, userAnswers })
  }

  setShowResults() {
    this.state$.next({...this.state$.value, showResults: true})
  }

  private setQuestions(questions: Question[]) {
    this.state$.next({ ...this.state$.value, questions })
  }

  private turnOver(direction: Direction) {
    const currentQuestionIndex = direction === Direction.FORWARD
      ? ++this.state$.value.currentQuestionIndex
      : --this.state$.value.currentQuestionIndex;

    this.state$.next({ ...this.state$.value, currentQuestionIndex })
  }
}
