import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pm-start',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() rating = 0;
  cropWidth = 75;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }


}
