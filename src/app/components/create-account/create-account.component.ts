import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {


  listOfColleges: string[] = [
    'The University of Alabama',
    'Auburn Sucks',
    'South Alabama'
  ];
  filteredOptions: Observable<string[]>;
  collegeSearchBox = new FormControl();

  createAccountForm;
  roles: string[] = ['Athlete', 'Fan'];

  filteredColleges: Observable<any>;
  listOfCollegesFromApi: string[];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) {
      this.createAccountForm = this.formBuilder.group(
        {
          college: ['', Validators.required],
          sport: ['', Validators.required],
          class: ['', Validators.required],
          position: ['', Validators.required],
          role: ['', Validators.required],
        });
     }

  ngOnInit() {
    // Uncomment after testing autocomplete
    // this.getListOfCollege().subscribe((data) => { console.log(data); });
    // this.listOfColleges = this.getListOfCollege().subscribe();
    this.filteredOptions = this.collegeSearchBox.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // Get college results
    this.filteredColleges = this.getListOfCollege().pipe(
      // The correct data is getting here.  Now I need to
      // iterate through the response and assign it to an array
      // so it will be shown in the autocomplete
    map(value => console.log(value)));

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfColleges.filter(college => college.toLowerCase().indexOf(filterValue) === 0);
  }

  getListOfCollege(): Observable<object> {
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';
    // return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + apiKey);
    // return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.region_id=0,1,2,3,4,5,6,7,8,9'
    //                       + '&fields=id,school.name&per_page=100' + apiKey);
    return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name=""'
    + '&fields=id,school.name&per_page=100' + apiKey);
  }

  collegeSearchBoxChange() {
    // this.filteredColleges = this.collegeSearchBox.valueChanges.pipe(
    //   map(value => this._filter(value))
    // );
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';
    // return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + apiKey);
    // return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.region_id=0,1,2,3,4,5,6,7,8,9'
    //                       + '&fields=id,school.name&per_page=100' + apiKey);
    return this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name=""'
    + '&fields=id,school.name&per_page=100' + apiKey);
  }

  private _filterFromApi(value: string): Observable<any> {
    const apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';

    const filterCollegeResults = this.http.get('https://api.data.gov/ed/collegescorecard/v1/schools' + '?school.name='
    + value + '&fields=id,school.name&per_page=100' + apiKey).pipe();

    return filterCollegeResults;
  }

}
