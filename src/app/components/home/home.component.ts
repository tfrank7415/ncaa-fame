import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testMap;
  testArray: string[];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.testArray = ['initialize'];
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';

    this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.region_id=0,1,2,3,4,5,6,7,8,9'
    + '&fields=id,school.name&per_page=100' + apiKey).pipe(
      map(value => {
          let index = 0;
          value.results.forEach((x) => {
            // testArray.
            // this.testArray = this.testArray + ', ' +  x['school.name'];
            this.testArray[index] = x['school.name'];
            console.log(x['school.name']);
            index++;
        });
        })
    ).subscribe(() => {
      console.log(this.testArray);
    });
    // console.log(this.testArray);
  }
}
