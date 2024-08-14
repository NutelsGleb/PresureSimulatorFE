import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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
  id: any;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) { }  
  
  ngOnInit(): void {
	const id = this.route.snapshot.queryParamMap.get('id');
	this.id = id;
  //get person
    this.http.get<any>('http://localhost:8088/api/v1/persons/person/'+this.id)
      .subscribe(data => {
        this.person = data;
		this.fullName = this.person.fullname
		console.log(this.person.fullname)
      }, error => {
        console.error('Error loading person', error);
      });
	  
	this.getmeasure();  
	//init
    this.measurementsForm = this.fb.group({
      fullName: ['', Validators.required],
      systolicPressure: ['', Validators.required],
      diastolicPressure: ['', Validators.required],
      heartRate: ['', Validators.required]
    });
  }
  
  getmeasure(): void {
  	//get measurements for this person  
    this.http.get<any>('http://localhost:8088/api/v1/measurements/'+this.id)
      .subscribe(mdata => {
        this.measurements = mdata;
		console.log('get measurements ok')
      }, error => {
        console.error('Error loading measurements', error);
      });
  }

    // generate
  measure(): void {
    this.http.get<any>('http://localhost:8088/api/v1/generator')
      .subscribe(response => {
          this.measurementsForm.patchValue({
		  fullName: this.person.fullname,
          systolicPressure: response.systolicPressure,
          diastolicPressure: response.diastolicPressure,
          heartRate: response.heartRate
        });
		console.log('generator ok');
      }, error => {
        console.error('Error measuring data', error);
      });
  }

  saveMeasurement(): void {
    if (this.measurementsForm.valid) {
	  const formData = this.measurementsForm.value;
	  
      this.http.post('http://localhost:8088/api/v1/measurements/measurement/'+this.id, formData)
        .subscribe(data => {
          console.log('Success');
			this.getmeasure();
			this.cdr.detectChanges();
        }, error => {
          console.error('Error submitting measurement data', error);
        }); 
      this.measurementsForm.reset(); // Очистка формы после сохранения
    } else {
      console.log('Form is invalid');
    }
  }
}
