import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Asegúrate de la ruta correcta a tu servicio
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {}


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(
          (response) => {
            this.snackBar.open('Autenticación exitosa', 'Cerrar', {
              duration: 3000, // Duración de la notificación en milisegundos
            });
            localStorage.setItem('authToken', response.token);
            // Redireccionar al usuario
            this.router.navigate(['/admin/dashboard']);
          },
          (error) => {
            if(error.error){
              this.snackBar.open(error.error.message, 'Cerrar', {
                duration: 3000,
              });
            }
          }
        );
    }
  }


}
