import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { TransferService } from './transfer.service';

@Component({
  selector: 'iam-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.less'],
  providers: [TransferService]
})
export class StepFormComponent implements OnInit {
  get item(): TransferService {
    return this.srv;
  }

  step1Form!: FormGroup;

  step2Form!: FormGroup;

  radioValue = false;

  loading = false;

  count = 0;
  interval$: any;

  get captcha(): AbstractControl {
    return this.step1Form.controls['captcha'];
  }

  get mobile(): AbstractControl {
    return this.step1Form.controls['mobile'];
  }

  get mobile2(): AbstractControl {
    return this.step2Form.controls['mobile'];
  }

  get email(): AbstractControl {
    return this.step1Form.controls['email'];
  }

  constructor(private fb: FormBuilder, private srv: TransferService, public modalRef: NzModalRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      captcha: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      mobile: [{ value: '15738860893', disabled: true }, [Validators.required]],
      email: [{ value: '506499594@qq.com', disabled: true }, [Validators.required]]
    });
    this.step2Form = this.fb.group({
      mobile: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern(/^1\d{10}$/)])],
      captcha: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  submitForm(): void {
    if (this.item.step === 0) {
      Object.assign(this.item, { radioValue: this.radioValue });
      ++this.item.step;
    } else if (this.item.step === 1) {
      if (this.captcha.invalid) {
        this.captcha.markAsDirty();
        this.captcha.updateValueAndValidity({ onlySelf: true });
        return;
      }
      this.count = 0;
      this.cdr.detectChanges();
      clearInterval(this.interval$);
      ++this.item.step;
    }
  }

  prev(): void {
    --this.item.step;
    this.count = 0;
    this.cdr.detectChanges();
    clearInterval(this.interval$);
  }

  step2FormInvalid() {
    if (this.step2Form.invalid) {
      Object.values(this.step2Form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    } else {
      return true;
    }
  }

  getCaptcha(): void {
    if (!this.item.radioValue) {
      if (this.mobile.invalid) {
        this.mobile.markAsDirty();
        this.mobile.updateValueAndValidity({ onlySelf: true });
        return;
      } else {
        this.countDown();
      }
    } else {
      if (this.step1Form.controls['email'].invalid) {
        this.email.markAsDirty();
        this.email.updateValueAndValidity({ onlySelf: true });
        return;
      } else {
        this.countDown();
      }
    }
  }
  countDown() {
    this.count = 59;
    this.cdr.detectChanges();
    this.interval$ = setInterval(() => {
      this.count -= 1;
      this.cdr.detectChanges();
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
    this.count = 59;
  }

  getCountDown() {
    if (this.mobile2.invalid) {
      this.mobile2.markAsDirty();
      this.mobile2.updateValueAndValidity({ onlySelf: true });
      return;
    } else {
      this.countDown();
    }
  }
}
