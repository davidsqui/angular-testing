import { Calculator } from './calculator';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testing';

  ngOnInit(): void {
    const calculator = new Calculator();
    const result = calculator.multiply(3,3);
  }

}
