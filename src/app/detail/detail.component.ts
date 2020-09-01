import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../services/loader.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  joke$: Observable<any>;
  id: number;
  private $destroyed = new Subject();
  constructor(private route: ActivatedRoute,
              private sLoader: LoaderService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id ? +params.id : 0; // (+) converts string 'id' to a number
    });
    this.joke$ = this.sLoader.fetchJokeDetail(this.id).pipe(takeUntil(this.$destroyed));
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }

}
