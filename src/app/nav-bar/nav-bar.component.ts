import { Component, OnInit } from '@angular/core';
import {ThemesService} from '../services/themes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public sThemes: ThemesService) { }

  ngOnInit(): void {
  }

}
