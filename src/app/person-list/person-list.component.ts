import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: any[] = [];
  selectedPerson: string = '';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.http.get<any[]>(this.apiUrl+'/persons')
      .subscribe(data => {
        this.persons = data;
      }, error => {
        console.error('Error loading persons', error);
      });
  }
  selectPerson(id: string): void {
    this.selectedPerson = id;
    this.router.navigate(['/measurements'], { queryParams: { id: this.selectedPerson } });
  }

  goToform(): void {
    this.router.navigate(['/form']);
  }
}
