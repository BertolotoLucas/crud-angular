import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Course } from '../model/course';

const apiUrl = 'http://localhost:8080/api/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get(apiUrl);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/${id}`);
  }

  create(course: Course): Observable<any> {
    return this.http.post(apiUrl,course);
  }

  update(id: number, course: Course): Observable<any> {
    return this.http.put(`${apiUrl}/${id}`,course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
