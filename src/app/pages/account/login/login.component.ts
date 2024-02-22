import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomePage } from 'src/app/home/home.page';
import { AccountService } from 'src/app/services/account.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private accountService: AccountService,
    private form_builder: FormBuilder,
    private router: Router
  ) { }

  submited: boolean = false;
  loading: boolean = false;
  component = RegisterComponent;

  public form: FormGroup = this.form_builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  get password(): FormControl {
    return this.form.get('password') as FormControl
  }
  
  get email(): FormControl {
    return this.form.get('email') as FormControl
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submited = true;
    this.loading = true;
    if(this.form.invalid) {
      this.loading = false;
      return
    }

    this.accountService.login(this.email.value, this.password.value) .subscribe({next: res => {
      this.accountService.authenticated();
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.loading = false;
      this.submited = false;
    }, error: (err)=> console.log(err)})

  }

}
