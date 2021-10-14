import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/domain/instructor';
import { Department } from 'src/app/domain/department';
import { InstructorService } from 'src/app/service/instructor.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  public instructors: Instructor[] = [];
  public department: Department = new Department(0, '', 0, new Date(), 0);

  public showMsg: boolean = false;
  public msg: string = '';
  public type: string = '';

  constructor(public departmentService: DepartmentService,
    public instructorService: InstructorService,
    public router: Router){ }

  ngOnInit(): void {
    this.getAllInstructors();
  }

  getAllInstructors() {
    this.instructorService.getAll().subscribe(data => {
      this.instructors = data;
    });
  }

  public create(){
    if(this.department.Name === ''){
      this.showMsg = true;
      this.msg = 'The field Name is required';
      this.type =  'warning';
      return;
    }

    this.departmentService.create(this.department).subscribe(data => {      
      this.router.navigate(['department-list']);
    }, error => {
      this.showMsg = true;
      this.msg = error;
      this.type =  'danger';
    });
  }

}
