import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICollege } from 'src/app/models/college';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private apiKey = '&api_key=5aK2Q44gIHwMi8OT47euUyjmxxswN5TWJ23atqaa';

  constructor(
    private http: HttpClient
  ) { }

  getListOfColleges(): Observable<ICollege[]> {
    return this.http.get<ICollege[]>('https://api.data.gov/ed/collegescorecard/v1/schools?zip=78242&distance=20mi'
    + '&fields=id,school.name&per_page=100' + this.apiKey);
  }
}
