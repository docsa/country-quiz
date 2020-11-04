import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from'./country.interface'

const COUNTRY_URL = 'https://restcountries.eu/rest/v2'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private countries:Country[] = [];

  constructor(private http: HttpClient) { }

  getCapitalQuestion() {
    if (this.countries.length ===0) {
      return this.http.get(COUNTRY_URL+'/all').toPromise()
      .then( (data: Country[]) => {
        console.log(data)
        this.countries=data;
        return this.drawQuestion()
      });
    } else {
      return this.drawQuestion();
    }
  }

  drawQuestion() {
    let capitals=[];
    while(capitals.length<4) {
      let rand=Math.floor(Math.random() * this.countries.length)
      if( !capitals.find(a => a===rand )) {
        capitals.push({
          'name': this.countries[rand].name,
          'capital': this.countries[rand].capital,
          'flag': this.countries[rand].flag,
        })
      }
    }
    console.log("QuestionsService -> getCapitalQuestion -> capitals", capitals)
  }
}
