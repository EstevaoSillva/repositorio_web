import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiUrl = 'http://127.0.0.1:8000/api';          
                                                      
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { } 

  // Verifica se o usuário está logado
  getUsuarioId(): number | null {
    const usuarioId = this.localStorageService.getItem('usuarioId');
    console.log('ID do usuário recuperado do localStorage:', usuarioId);
    if (usuarioId) {
      return parseInt(usuarioId);
    }
    return null;
  }

  // Criação de Login
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.ApiUrl}/login/`, credentials);
  }

  // Criação de Registro
  register(userData: any): Observable<any> {
    const body = JSON.stringify(userData); // Use JSON.stringify()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Verifica o cabeçalho
    });
    return this.http.post(`${this.ApiUrl}/register/`, body, { headers });
  }
  
  getUserData(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.localStorageService.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.ApiUrl}/user/`, { headers });
    } else {
      return new Observable((observer) => {
        observer.error('localStorage is not available on the server.');
      });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
