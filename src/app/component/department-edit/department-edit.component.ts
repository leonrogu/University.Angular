import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/domain/instructor';
import { Department } from 'src/app/domain/department';
import { InstructorService } from 'src/app/service/instructor.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {

  public instructors: Instructor[] = [];
  public department: Department = new Department(0, '', 0, new Date(), 0);
  public id: number= 0;

  public showMsg: boolean = false;
  public msg: string = '';
  public type: string = '';

  constructor(public departmentService: DepartmentService,
    public instructorService: InstructorService,
    public activatedRoute: ActivatedRoute,
    public router: Router){ }

  ngOnInit(): void {
    this.getAllInstructors();
    this.getById();
  }

  getAllInstructors() {
    this.instructorService.getAll().subscribe(data => {
      this.instructors = data;
    });
  }

  getById() {

    let  param = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = Number(param);

    this.departmentService.getById(this.id).subscribe(data => {
      this.department = data;
    });
  }

  public edit(){
    if(this.department.Name === ''){
      this.showMsg = true;
      this.msg = 'The field Name is required';
      this.type =  'warning';
      return;
    }

    this.departmentService.edit(this.department).subscribe(data => {      
      this.router.navigate(['department-list']);
    }, error => {
      this.showMsg = true;
      this.msg = error;
      this.type =  'danger';
    });
  }

}
