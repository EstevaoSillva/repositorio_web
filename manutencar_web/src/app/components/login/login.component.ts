import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service/auth.service'; 
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  login() {
    console.log('Login iniciado');
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login bem-sucedido', response);
        if (isPlatformBrowser(this.platformId)){
          console.log('localStorage sendo acessado no navegador');
          localStorage.setItem('token', response.access);
          localStorage.setItem('usuarioId', response.usuario.id.toString());
        } else {
          console.log('localStorage não acessado no servidor');
        }
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro no login', error);
      }
    );
    console.log('Login concluído');
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}