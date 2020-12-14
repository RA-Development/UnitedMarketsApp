import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errormessage = '';
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    //  Initialize the form group
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Reset login status
    this.authenticationService.logout();

    // Get return url from route parameters or default
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin/orders';
  }

  // Getters for easy access to form fields
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.username.value, this.password.value)
      .subscribe(
        success => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.submitted = true;
          // TODO: Get the error message from back-end.
          this.errormessage = error.message;
          this.loading = false;
        });
  }
}
