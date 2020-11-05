import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';


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

  @Input()  private afterClick: EventEmitter<number>;

  @Output() newItemEvent = new EventEmitter<number>();

  private eventsSubscription: Subscription;
  @Input() clearButtons: Observable<void>;

  constructor() { }

  ngOnInit(): void {
    this.letter = String.fromCharCode(65+this.index);
    if(this.clearButtons) {
      this.eventsSubscription = this.clearButtons.subscribe(()=> {
      console.log("ButtonComponent -> ngOnInit -> eventsSubscription")
        this.wasClicked = false;
        this. afterAnswer = false;
        this.isTrue = false;
        this. isFalse = false;
      });
    }
    if (this.afterClick) {
      this.afterClick.subscribe(data => {
        this.afterAnswer=true;
        if(this.wasClicked) {
          if(data===this.index ) {
            this.isTrue=true;
          } else {
            this.isFalse = true;
          }
        }

      });
    }
  }

  validate(): void {
    this.wasClicked=true;
    this.newItemEvent.emit(this.index)
  }

}
