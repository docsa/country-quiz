import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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

  constructor() { }

  ngOnInit(): void {
    this.letter = String.fromCharCode(65+this.index);
    if (this.afterClick) {
      this.afterClick.subscribe(data => {
        this.afterAnswer=true;
        if(data===this.index ) {
          this.isTrue=true;
        } else if(this.wasClicked)
          this.isFalse=true;
      });
    }
  }

  validate(): void {
    this.wasClicked=true;
    this.newItemEvent.emit(this.index)
  }

}
