import { Component, OnInit, Input } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EventBusService } from '../shared/event-bus.service';
import { EventData } from '../shared/event.class';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  letter : string;
  isTrue: boolean = false;
  isFalse: boolean = false;
  wasClicked: boolean = false;
  afterAnswer: boolean = false;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;


  @Input() index: number;

  private eventsSubscription: Subscription;

  constructor(private eventBusService: EventBusService) { }

  ngOnInit(): void {
    this.letter = String.fromCharCode(65+this.index);
    this.eventBusService.on('tryAgain', (dummy: boolean) => {
    console.log("ButtonComponent -> ngOnInit -> tryAgain")
      this.wasClicked = false;
      this. afterAnswer = false;
      this.isTrue = false;
      this. isFalse = false;
    });
    this.eventBusService.on('correct', (correctId: number) => {
      this.afterAnswer=true;
      if(this.wasClicked) {
        if(correctId===this.index ) {
          this.isTrue=true;
        } else {
          this.isFalse = true;
        }
      }

    });
  }

  validate(): void {
    this.wasClicked=true;
    this.eventBusService.emit(new EventData('answer', this.index))
  }

}
