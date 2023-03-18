import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-start',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() rating = 0;
  cropWidth = 75;
  @Output() ratingClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  onRatingClick() : void{
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }

}
