import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Country } from '../country.interface';
import { EventData } from '../shared/event.class';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  answerOK = false;
  gameOver = false;
  countries: Country[] = [];
  capital: string;
  correctAnswer: number;
  goodAnswers = 0;

  constructor( private eventBusService: EventBusService )
   {}

  @Input() question: Observable<Country[]>;

  ngOnInit(): void {
    this.eventBusService.on('question', (data) => {
      this.countries = data;
      this.correctAnswer = Math.floor(Math.random() * 4);
      this.capital = this.countries[this.correctAnswer].capital;
    });
    this.eventBusService.on('answer', (answerId: number) => {
      console.log('QuestionComponent -> eventBus -> answer', answerId);
      this.eventBusService.emit(new EventData('check', this.correctAnswer));
      if (answerId === this.correctAnswer) {
        this.answerOK = true;
        this.goodAnswers = this.goodAnswers + 1;
        console.log('AppComponent -> ngOnInit -> this.goodAnswers', this.goodAnswers);
      } else {
        setTimeout(() => {
          this.gameOver = true;
        }, 1500);
      }
    });
  }

  next(): void {
    this.answerOK = false;
    this.eventBusService.emit(new EventData('next', null));
  }

  restart(): void {
    this.gameOver = false;
    this.eventBusService.emit(new EventData('restart', null));
  }
}
