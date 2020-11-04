import { Component, OnInit } from '@angular/core';
import { QuestionsService} from './questions.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'country-quiz';

  ngOnInit() {
    this.questionsService.getCapitalQuestion();
  }

  constructor(private questionsService: QuestionsService) {}



/*   mainLoop() {
    for(let numQuest= 1 ; numQuest<=10 ; numQuest++)

  } */
}
