import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    },{ validators: this.passwordsMatch });
  }
  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value || '';
    const confirmPassword = group.get('confirmPassword')?.value || '';
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.snackBar.open('Se registro el usuario con éxito', 'Cerrar', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open('Error en el registro', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  ngOnInit(): void {}


}
