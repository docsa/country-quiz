import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {filter, map } from 'rxjs/operators';
import { EventData } from 'src/app/shared/event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  constructor() { }

  emit(event: EventData): void {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter( (e: EventData) => e.name === eventName),
      // tslint:disable-next-line: no-string-literal
      map( (e: EventData) => e['value'])).subscribe(action);

  }
}
