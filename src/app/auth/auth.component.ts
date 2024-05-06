import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { MainService } from '../shared/services/main.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    standalone: true,
    imports: [PlaceholderDirective, FormsModule, ReactiveFormsModule]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  authFormGroup: FormGroup;
  error: string = null;
  authSub$: Observable<any>;
  private closeSub$: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private mainService: MainService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.authFormGroup = new FormGroup<{
      email: FormControl;
      password: FormControl;
    }>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authFormGroup.valid) {
      this.mainService.isLoading.next(true);
      const authFormData = {
        email: this.authFormGroup.get('email').value,
        password: this.authFormGroup.get('password').value
      };

      if (this.isLoginMode) {
        this.authSub$ = this.authService.loginUser(authFormData);
      } else {
        this.authSub$ = this.authService.signUpUser(authFormData);
      }

      this.authSub$.subscribe({
        next: () => {
          this.mainService.isLoading.next(false);
          this.error = null;
          this.authFormGroup.reset();
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.error = error;
          this.showErrorAlert(error);
          this.mainService.isLoading.next(false);
        }
      });

      this.authFormGroup.reset();
    }
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // create dynamic component
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertCmpRef =
      hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
    alertCmpRef.instance.message = message;
    this.closeSub$ = alertCmpRef.instance.close.subscribe(() => {
      this.closeSub$.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if(this.closeSub$) {
      this.closeSub$.unsubscribe();
    }
  }
}
