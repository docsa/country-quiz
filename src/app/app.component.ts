import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from './country.interface';
import { CountryService} from './country.service'
import { EventBusService } from './shared/event-bus.service';
import { EventData } from './shared/event.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'country-quiz';
  AllCountries:Country[];
  counter: number = 0;
  goodAnswers: number = 0;

  constructor(private countryService: CountryService,
              private eventBusService: EventBusService) {}

  ngOnInit() {
    this.countryService.getCountries().then((data: Country[]) => {
      this.AllCountries = data;
      this.drawQuestion();
    });

    this.eventBusService.on('next', () => {
      this.drawQuestion();
    })

    this.eventBusService.on('correct', () => {
      this.goodAnswers = this.goodAnswers+1;
      console.log("AppComponent -> ngOnInit -> this.goodAnswers", this.goodAnswers)
    })
  }

  drawQuestion() : void {
    let questions:Country[] =[];
    while(questions.length<4) {
      let rand=Math.floor(Math.random() * this.AllCountries.length)
      if( this.AllCountries[rand].name !=='' && !questions.find(a => a.name === this.AllCountries[rand].name )) {
        questions.push({
          'name': this.AllCountries[rand].name,
          'capital': this.AllCountries[rand].capital,
          'flag': this.AllCountries[rand].flag,
        })
      }
    }
    console.log("AppComponent -> drawQuestion -> questions", questions)
    this.eventBusService.emit(new EventData('question', questions));
    return ;
  }




/*   mainLoop() {
    for(let numQuest= 1 ; numQuest<=10 ; numQuest++)

  } */
}
