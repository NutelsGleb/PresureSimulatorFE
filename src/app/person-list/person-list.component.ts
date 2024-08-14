import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.http.get<any[]>('http://localhost:8088/api/v1/persons') // Предположим, что этот эндпоинт возвращает список персон
      .subscribe(data => {
        this.persons = data;
      }, error => {
        console.error('Error loading persons', error);
      });
  }

  goToMeasurements(): void {
	this.router.navigate(['/measurements']);
  }
  goToform(): void {
    this.router.navigate(['/form']);
  }
}
