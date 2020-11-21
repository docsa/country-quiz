import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from '../shared/event-bus.service';
import { EventData } from '../shared/event.class';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

enum State  {
  WAITING = 'waiting',
  CLICKED = 'clicked',
  CORRECT = 'correct',
  INCORRECT = 'incorrect'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy {

  letter: string;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  state: State = State.WAITING ;
  subCheck$: Subscription;
  subTry$: Subscription;


  @Input() index: number;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.letter = String.fromCharCode(65 + this.index);

    // envent check answer
    this.subCheck$ = this.eventBusService.on('check', (correctId: number) => {
      if (this.state === State.CLICKED) {
        if (correctId === this.index ) {
          this.state = State.CORRECT;
        } else {
          this.state = State.INCORRECT;
        }
      }
    });

    // After a pause try again if incorrect repnse
    this.subTry$ = this.eventBusService.on('tryAgain', () => {
    console.log('ButtonComponent -> ngOnInit -> tryAgain');
    this.state = State.WAITING;
    });

  }

  ngOnDestroy(): void {
    this.subTry$.unsubscribe();
    this.subCheck$.unsubscribe();
  }

  validate(): void {
    this.state = State.CLICKED;
    this.eventBusService.emit(new EventData('answer', this.index));
  }

}
