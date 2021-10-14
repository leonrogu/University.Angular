import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Instructor } from '../domain/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  public url: string = '';

  constructor(public httpClient: HttpClient) { 
    this.url = environment.apiUrl + 'api/Instructors/';
  }

  public getAll() : Observable<any>{
    return this.httpClient.get(this.url + 'GetInstructors/');
  }

  public getById(id:number) : Observable<any>{
    return this.httpClient.get(this.url + 'GetInstructors/' + id);
  }

  public create(instructor: Instructor): Observable<any>{
    return this.httpClient.post(this.url, instructor);
  }

  public edit(instructor: Instructor): Observable<any>{
    return this.httpClient.put(this.url + instructor.ID, instructor);
  }

  public delete(id:number) : Observable<any>{
    return this.httpClient.delete(this.url + id);
  }
}
