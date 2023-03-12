import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
  
  @Input() rating: number = 0;
  cropWidth:number = 75;
  @Output() notify:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  ngOnInit(): void {
  }

  notifyOuterComponent():void{
    console.log('clicked');
    this.notify.emit(`The rating ${this.rating} was clicked!`);
  }

}
