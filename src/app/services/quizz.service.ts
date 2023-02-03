import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../interfaces/question.interface';
import { BehaviorSubject } from 'rxjs';
import { QuizzState } from '../interfaces/quizz-state.interface';

enum Direction {
  FORWARD,
  BACKWARD
}

const URL = '../../assets/data/quizz.json';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  public state$ = new BehaviorSubject<QuizzState>({
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    questions: []
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

  private turnOver(direction: Direction) {
    const currentQuestionIndex = direction === Direction.FORWARD
      ? ++this.state$.value.currentQuestionIndex
      : --this.state$.value.currentQuestionIndex;

    this.state$.next({ ...this.state$.value, currentQuestionIndex })
  }
    
  getQuizz() {
    this.http.get<Array<Question>>(URL).subscribe(this.setQuestions.bind(this))
  }

  private setQuestions(questions: Question[]) {
    this.state$.next({ ...this.state$.value, questions })
  }
}
