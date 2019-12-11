import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import 'rxjs/add/operator/filter';

import { MenuItems } from '../../shared/menu-items/menu-items';


@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [

  ]
})

export class AdminLayoutComponent implements OnInit {
  constructor(public menuItems: MenuItems) {

  }

  ngOnInit() { }

}
