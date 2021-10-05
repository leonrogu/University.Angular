import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../domain/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public url: string = '';

  constructor(public httpClient: HttpClient) { 
    this.url = 'https://university-api.azurewebsites.net/api/Students/';
  }

  public getAll() : Observable<any>{
    return this.httpClient.get(this.url + 'GetStudents/');
  }

  public getById(id:number) : Observable<any>{
    return this.httpClient.get(this.url + 'GetStudent/' + id);
  }

  public create(student: Student): Observable<any>{
    return this.httpClient.post(this.url, student);
  }

  public edit(student: Student): Observable<any>{
    return this.httpClient.put(this.url + student.ID, student);
  }

  public delete(id:number) : Observable<any>{
    return this.httpClient.delete(this.url + id);
  }
}





