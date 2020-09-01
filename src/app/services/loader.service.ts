import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take, takeUntil} from 'rxjs/operators';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements OnDestroy{
  // in this case i should use NgRx store and effects instead of store those vars here
  // its just to avoid the initialisation every component init just have no time to implement the store but I'm familiar with using it
  jokes: {id: number, joke: string}[];
  filteredJokes: {id: number, joke: string}[];
  searchKeys: string;
  private $destroyed = new Subject();

  constructor(private http: HttpClient) {
    this.fetchJokes();
  }

  fetchJokes() {
    this.http.get<any>('http://api.icndb.com/jokes/random/1000').pipe(
      takeUntil(this.$destroyed),
      map(res => res.value)
    ).subscribe(
      data => {
        this.jokes = data;
        this.filteredJokes = data;
      }
    );
  }

  fetchJokeDetail(id): Observable<any> {
    return this.http.get<any>(`http://api.icndb.com/jokes/${id}`).pipe(
      map(res => res.value)
    );
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }
}
