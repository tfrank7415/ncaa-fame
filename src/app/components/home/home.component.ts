import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable, of } from 'rxjs';
import { map, subscribeOn, startWith, debounceTime, toArray } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CollegeService } from 'src/app/services/utilities/college.service';
import { ICollege } from 'src/app/models/college';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  collegeArray: ICollege[] = [{name: 'test', id: 1234  }];
  collegeObservable: Observable<ICollege[]>;

  // The below two variable work.
  // I need to figure out what is the difference between the above and the below variables. 
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  myControl = new FormControl();

  // Variable must be an observable to use in ngFor
  filteredColleges: Observable<ICollege[]>;

  constructor(
    private http: HttpClient,
    private collegeService: CollegeService
  ) { }

  ngOnInit() {
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';

    // Populate college array
    this.collegeService.getListOfColleges()
                        .subscribe(data => this.collegeArray = data);

  // Filter collegeArray
    this.filteredColleges = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
  // }

  private _filter(value: string): ICollege[] {
    // console.log(this.collegeArray);

    // TODO: FIGURE OUT WHY MY FUCKING ARRAY CAN'T USE ARRAY FUNCTIONS LIKE FILTER
    const filterValue = value.toLowerCase();
    console.log(this.collegeArray);

    return this.collegeArray.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

    // This returns all the results with the 'value' in the name.
    // console.log('Letter entered in ddl. ' + 'Api called');
    // this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name=' + value
    //     + '&fields=id,school.name&per_page=100' + apiKey).pipe(
