import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses?: Course[];
  selected?: Course;
  currentIndex: number = -1;
  name: string = '';
  category: string = '';
  displayedColumns = ['name','category'];

  constructor(private courseService: CoursesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getCourses();
    })
  }

  getCourses(): void {
    this.courseService.list()
      .subscribe( course => {
        this.courses = course;
      },
      error => {
        console.error(error);
      });
  }

  refreshList(): void {
    this.getCourses();
    this.selected = undefined;
    this.currentIndex = -1;
  }

  setSelected(course: Course, index: number): void {
    if (this.selected && this.selected._id == course._id) {
      this.selected = undefined;
      this.currentIndex = -1;
    } else {
      this.selected = course;
      this.currentIndex = index;
    }
  }

  deleteCourse(): void {
    if (!this.selected) {
      return;
    }

    this.courseService.delete(this.selected._id)
      .subscribe(response => {
        this.refreshList();
      },
      error => {
        console.error(error);
      });
  }

}
