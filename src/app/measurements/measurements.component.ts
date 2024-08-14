import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  measurementsForm!: FormGroup;
  measurementsTable: any[] = []; // Таблица для записи измерений
  person: any;
  fullName: string = '';
  measurements: any[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
  //get person
	const id = this.route.snapshot.queryParamMap.get('id');
    this.http.get<any>('http://localhost:8088/api/v1/persons/person/'+id)
      .subscribe(data => {
        this.person = data;
		this.fullName = this.person.fullname
		console.log(this.person.fullname)
      }, error => {
        console.error('Error loading person', error);
      });
	  
	//get measurements for this person  
    this.http.get<any>('http://localhost:8088/api/v1/measurements/'+id)
      .subscribe(mdata => {
        this.measurements = mdata;
		console.log(this.measurements)
      }, error => {
        console.error('Error loading measurements', error);
      });
	  
	//init
    this.measurementsForm = this.fb.group({
      fullName: ['', Validators.required],
      systolicPressure: ['', Validators.required],
      diastolicPressure: ['', Validators.required],
      heartRate: ['', Validators.required]
    });
  }

  measure(): void {
    const personId = this.measurementsForm.get('personId')?.value;

    // Пример API запроса на измерение данных
    this.http.get<any>('http://localhost:8088/api/v1/generator')
      .subscribe(response => {
          this.measurementsForm.patchValue({
		  fullName: this.person.fullname,
          systolicPressure: response.systolicPressure,
          diastolicPressure: response.diastolicPressure,
          heartRate: response.heartRate
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
