import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  measurementsForm!: FormGroup;
  measurementsTable: any[] = []; // Таблица для записи измерений

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.measurementsForm = this.fb.group({
      fullName: ['', Validators.required],
      upperPressure: ['', Validators.required],
      lowerPressure: ['', Validators.required],
      pulse: ['', Validators.required]
    });
  }

  measure(): void {
    const fullName = this.measurementsForm.get('fullName')?.value;

    // Пример API запроса на измерение данных
    this.http.post<any>('http://localhost:8088/api/v1/measure', { fullName: fullName })
      .subscribe(response => {
        // Допустим, что ответ API содержит поля upperPressure, lowerPressure и pulse
        this.measurementsForm.patchValue({
          upperPressure: response.upperPressure,
          lowerPressure: response.lowerPressure,
          pulse: response.pulse
        });
      }, error => {
        console.error('Error measuring data', error);
      });
  }

  saveMeasurement(): void {
    if (this.measurementsForm.valid) {
      this.measurementsTable.push(this.measurementsForm.value);
      this.measurementsForm.reset(); // Очистка формы после сохранения
    } else {
      console.log('Form is invalid');
    }
  }
}
