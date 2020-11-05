import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from './country.interface';
import { QuestionsService} from './questions.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'country-quiz';
  AllCountries:Country[];
  askQuestion:Subject<Country[]> = new Subject<Country[]>();

  constructor(private questionsService: QuestionsService) {}

  ngOnInit() {
    this.questionsService.getCountries().then((data: Country[]) => {
      console.log("AppComponent -> ngOnInit -> AllCountries", data)
      this.AllCountries = data;
      let countries = this.drawQuestion();
      this.askQuestion.next(countries);
    });
  }

  drawQuestion() : Country[] {
    let capitals:Country[] =[];
    while(capitals.length<4) {
      let rand=Math.floor(Math.random() * this.AllCountries.length)
      if( !capitals.find(a => a.name === this.AllCountries[rand].name )) {
        capitals.push({
          'name': this.AllCountries[rand].name,
          'capital': this.AllCountries[rand].capital,
          'flag': this.AllCountries[rand].flag,
        })
      }
    }
    console.log("AppComponent -> drawQuestion -> capitals", capitals)
    return capitals;
  }




/*   mainLoop() {
    for(let numQuest= 1 ; numQuest<=10 ; numQuest++)

  } */
}
