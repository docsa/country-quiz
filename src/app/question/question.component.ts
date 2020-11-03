import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  private afterClick: EventEmitter<number> = new EventEmitter();
  answered:boolean = false;

  countries =['Vietnam', 'Malaysia', 'Sweden', 'Austria'];

  constructor() { }

  ngOnInit(): void {

  }

  answer(answer_num: number): void {
    this.answered = true;
    this.afterClick.emit(1);
  }

}
