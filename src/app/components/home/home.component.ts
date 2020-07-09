import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable, of } from 'rxjs';
import { map, subscribeOn, startWith, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testMap;
  collegeArray: string[] = [ 'The University of Alabama', ' Auburn Sucks', 'University of South Alabama'];
  myControl = new FormControl();
  filteredColleges: Observable<string[]>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';

    this.filteredColleges = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, apiKey))
      );

  }

  private _filter(value: string, apiKey: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    // Test calling api here.
    this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name=' + value
        + '&fields=id,school.name&per_page=100' + apiKey).pipe(
          // debounceTime(5000),
          map(value => {
              let index = 0;
              value.results.forEach((x) => {
                this.collegeArray[index] = x['school.name'];
                index++;
            });
            })
        ).subscribe(
          () => {console.log('Next'); },
          () => {console.log('Error'); },
          () => {
            // this.filteredColleges = of(this.collegeArray);
            console.log(this.collegeArray);
        });

    console.log(this.collegeArray);
    return this.collegeArray.filter(college => college.toLowerCase().includes(filterValue));
  }

  // Use this link: https://www.encodedna.com/angular/autocomplete-textbox-in-angular-6-using-web-api.htm
    // this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.region_id=0,1,2,3,4,5,6,7,8,9'
    //     + '&fields=id,school.name&per_page=100' + apiKey).pipe(
    //       map(value => {
    //           let index = 0;
    //           value.results.forEach((x) => {
    //             this.collegeArray[index] = x['school.name'];
    //             index++;
    //         });
    //         })
    //     ).subscribe(
    //       () => {console.log('Next'); },
    //       () => {console.log('Error'); },
    //       () => {
    //       console.log(this.collegeArray);
    //       // this.filteredColleges = of(this.collegeArray);
    //     });

    // this.filteredColleges = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value, apiKey), console.log('value change'))
    //   );
    // Commented on 7.7.2020.  Below works.
    // this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.region_id=0,1,2,3,4,5,6,7,8,9'
    // + '&fields=id,school.name&per_page=100' + apiKey).pipe(
    //   map(value => {
    //       let index = 0;
    //       value.results.forEach((x) => {
    //         this.collegeArray[index] = x['school.name'];
    //         index++;
    //     });
    //     })
    // ).subscribe(
    //   () => {console.log('Next'); },
    //   () => {console.log('Error'); },
    //   () => {
    //   console.log(this.collegeArray);
    // });

  // api call
  // _filter(value: string, key: string): string[] {
  //   console.log(value);
  //   const filterValue = value.toLowerCase();
  //   where I will need to make api call to get results with value
  //   this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name=New'
  //   + '&fields=id,school.name&per_page=100' + key)
  //     .pipe(
  //       map(value => {
  //           let index = 0;
  //           value.results.forEach((x) => {
  //             this.collegeArray[index] = x['school.name'];
  //             index++;
  //           });
  //       })
  //     ).subscribe(
  //      () => {console.log('Next'); },
  //      () => {console.log('Error'); },
  //      () => {
  //        console.log(this.collegeArray);
  //      });
  //   return this.collegeArray;
  // }
}
