import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit {

  activePage = 0;
  @Input()
  nbPages: number;

  constructor(private route: ActivatedRoute,
              private router: Router) { }


  checkNbPages() {
    if (this.activePage > this.nbPages - 1) {
      this.router.navigate(['/home', 0]);
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activePage = +params.page ? +params.page : 0; // (+) converts string 'id' to a number
    });
  }

}
