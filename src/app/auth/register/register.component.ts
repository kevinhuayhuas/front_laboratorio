import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required]],
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
      console.log('Formulario válido', this.registerForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
  ngOnInit(): void {}


}
