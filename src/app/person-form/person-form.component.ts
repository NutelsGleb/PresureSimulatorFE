import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Импортируем Router

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm!: FormGroup;
  formSubmitted: boolean = false; // Флаг для отслеживания отправки формы

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(110)]],
      gender: ['', Validators.required]
    });
//First letter
    this.personForm.get('name')?.valueChanges.subscribe(value => {
      this.personForm.patchValue({ name: this.capitalizeFirstLetter(value) }, { emitEvent: false });
    });

    this.personForm.get('surname')?.valueChanges.subscribe(value => {
      this.personForm.patchValue({ surname: this.capitalizeFirstLetter(value) }, { emitEvent: false });
    });
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
//First letter end

  onSubmit(): void {
    this.formSubmitted = true; // Устанавливаем флаг отправки формы

    if (this.personForm.valid) {
      const formData = this.personForm.value;

      this.http.post('http://localhost:8088/api/v1/persons/person', formData)
        .subscribe(response => {
          console.log('Person data submitted successfully', response);
          // Перенаправление на страницу измерений после успешной отправки формы
          this.router.navigate(['/measurements']);
        }, error => {
          console.error('Error submitting person data', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
    list(): void {
    this.router.navigate(['/list']);
  }

  get f() {
    return this.personForm.controls;
  }
}
