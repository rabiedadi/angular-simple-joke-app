import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoaderService} from '../services/loader.service';
import {ThemesService} from '../services/themes.service';
import {ActivatedRoute} from '@angular/router';
import {PaginationBarComponent} from '../pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activePage: number;
  @ViewChild(PaginationBarComponent, {static: false}) paginationBar: PaginationBarComponent;

  constructor(public sLoader: LoaderService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activePage = +params.page ? +params.page : 0; // (+) converts string 'id' to a number
    });
  }

  filterJokes() {
    if (this.sLoader.searchKeys) {
      this.sLoader.filteredJokes = this.sLoader.jokes.filter(joke => {
        return joke.joke.toLowerCase().indexOf(this.sLoader.searchKeys.toLowerCase()) != -1;
      });
      this.paginationBar.checkNbPages();
      setTimeout(_ => {
      }, 200);
    } else {
      this.sLoader.filteredJokes = this.sLoader.jokes;
    }
  }
}
