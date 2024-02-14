import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginError = false;
  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        //Se agrega la persistencia session que al cerrar la pestaña o el navegador cierra la sesión
        this.afAuth.setPersistence('session').then(() => {
          console.log('Persistencia de sesión establecida correctamente');
        });
        this.router.navigate(['/home']);
        this.dialogRef.close();
      })
      .catch((error) => {
        this.loginError = true;
      });
  }
}
