import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service/auth.service'; 
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    confirmacao_senha: '',
  };

  mensagemErro: string = '';  
  mensagemSucesso: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Injete PLATFORM_ID
  ) {}

  register() {
    if (this.userData.password !== this.userData.confirmacao_senha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    this.authService.register(this.userData).subscribe(
      (response) => {
        console.log('Registro bem-sucedido', response);
        this.mensagemSucesso = response.message;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro no registro', error);
        this.mensagemErro = 'Erro ao registrar usuário.';
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}