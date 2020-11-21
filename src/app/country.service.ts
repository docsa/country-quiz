import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country.interface';

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries: Country[] = [];

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  getCountries(): Promise<Object> {
      return this.http.get(COUNTRY_URL).toPromise();
  }

}
