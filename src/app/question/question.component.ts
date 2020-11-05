import { EventEmitter, Input , ApplicationRef} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Country } from '../country.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private eventsSubscription: Subscription;
  private afterClick: EventEmitter<number> = new EventEmitter();

  answerOK:boolean = false;
  countries:Country[] = [];
  capital: string;
  correctAnswer: number;

  constructor(private applicationRef: ApplicationRef) { }

  clearButtons:Subject<void> = new Subject<void>();

  @Input() question: Observable<Country[]>;

  ngOnInit(): void {
    this.eventsSubscription = this.question.subscribe((data) => {
      this.countries=data
      this.correctAnswer = Math.floor(Math.random() * 4)
      this.capital=this.countries[this.correctAnswer].capital
    });
  }

  answer(answerNum: number): void {
    console.log("QuestionComponent -> answer -> answer_num", answerNum)
    this.afterClick.emit(this.correctAnswer);
    if(answerNum === this.correctAnswer) {
      this.answerOK = true;
    } else {
      setTimeout(() => {
        this.clearButtons.next();
      }, 1500)
    }
  }

}
