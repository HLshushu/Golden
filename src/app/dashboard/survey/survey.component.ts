import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { 
  MatStepperIntl, 
  ErrorStateMatcher,
  MatDatepickerInputEvent,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatCheckboxChange,
  MAT_CHECKBOX_CLICK_ACTION
} from '@angular/material';
import { Observable, from } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export class TwStepperIntl extends MatStepperIntl {
    optionalLabel = 'Not Required';
}

// 调整时间为invalid + dirty, 即时显示错误。
export class EarlyStateMatcher extends ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) : boolean {
        return !!(control && control.invalid && control.dirty);
    }
}

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css'],
    providers: [
      {provide: MatStepperIntl, useClass: TwStepperIntl},
      {provide: ErrorStateMatcher, useClass: EarlyStateMatcher},
      {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "noop"}
    ]
})

export class SurveyComponent implements OnInit {
    isLinear: boolean;

    surveyForm: FormGroup;
    intro: string;
    countries$: Observable<any[]>;

    majorTechList: any[];
    interestList: any[];

    indeterminateSelectedPayFor: boolean;

    get selectedColorRed() {
      return this.surveyForm.get('otherQuestions').get('favoriteColorRed').value;
    }
  
    get selectedColorGreen() {
      return this.surveyForm.get('otherQuestions').get('favoriteColorGreen').value;
    }
  
    get selectedColorBlue() {
      return this.surveyForm.get('otherQuestions').get('favoriteColorBlue').value;
    }
  
    get selectedColorStyle() {
      return `rgb(${this.selectedColorRed}, ${this.selectedColorGreen}, ${this.selectedColorBlue})`;
    }  

    constructor(private httpClient: HttpClient) {
        this.surveyForm = new FormGroup({
            basicQuestions: new FormGroup({
                name: new FormControl('', Validators.required),
                intro: new FormControl('', [Validators.required, Validators.minLength(10)]),
                country: new FormControl(''),
                majorTech: new FormControl(''),
                interestList: new FormControl(null)       
            }),
            mainQuestions: new FormGroup({
              payForAll: new FormControl(false),
              payForBook: new FormControl(false),
              payForMusic: new FormControl(false),
              payForMovie: new FormControl(true),
              angularLikeScore: new FormControl(5),
              angularMaterialLikeScore: new FormControl(5),
              subscribeAngular: new FormControl(true),
              subscribeAngularMaterial: new FormControl(true),
              subscribeNgRx: new FormControl(false)
            }),
            otherQuestions: new FormGroup({
              favoriteColorRed: new FormControl(0),
              favoriteColorGreen: new FormControl(0),
              favoriteColorBlue: new FormControl(0),
              surveyScore: new FormControl(5)
            })            
        });
    }

    ngOnInit() {
        this.surveyForm
        .get('basicQuestions')
        .get('country')
        .valueChanges.pipe(debounceTime(300))
        .subscribe(inputCountry => {
            this.countries$ = this.httpClient.get<any[]>('assets/countries.json').pipe(map(countries => {
              return countries.filter(country => country.name.indexOf(inputCountry) >= 0);
            }));
          });

          this.majorTechList = [
            {
              name: 'Front-end',
              items: ['HTML', 'CSS', 'JavaScript']
            },
            {
              name: 'Rear-end',
              items: ['C#', 'NodeJs', 'Go']
            }
          ];

          this.interestList = [
            {
              id: 1,
              name: 'Ball',
              subItems: [
                {
                  id: 11,
                  name: 'Table Tennis'
                },
                {
                  id: 12,
                  name: 'Tennis'
                },
                {
                  id: 13,
                  name: 'Badminton'
                }
              ]
            },
            {
              id: 2,
              name: 'Other',
              subItems: [
                {
                  id: 21,
                  name: 'Swimming'
                },
                {
                  id: 22,
                  name: 'Running'
                }
              ]
            }
          ];
          
          this._setSelectAllState();
    }

    checkAllChange($event: MatCheckboxChange) {
      this.surveyForm
        .get('mainQuestions')
        .get('payForBook')
        .setValue($event.checked);
      this.surveyForm
        .get('mainQuestions')
        .get('payForMusic')
        .setValue($event.checked);
      this.surveyForm
        .get('mainQuestions')
        .get('payForMovie')
        .setValue($event.checked);
      this._setSelectAllState();
    }
  
    payForChange() {
      this._setSelectAllState();
    }
  
    private _setSelectAllState() {
      const payForBook = this.surveyForm.get('mainQuestions').get('payForBook').value;
      const payForMusic = this.surveyForm.get('mainQuestions').get('payForMusic').value;
      const payForMovie = this.surveyForm.get('mainQuestions').get('payForMovie').value;
      const count = (payForBook ? 1 : 0) + (payForMusic ? 1 : 0) + (payForMovie ? 1 : 0);
      this.surveyForm
        .get('mainQuestions')
        .get('payForAll')
        .setValue(count === 3);
      this.indeterminateSelectedPayFor = count > 0 && count < 3;
    }  
}