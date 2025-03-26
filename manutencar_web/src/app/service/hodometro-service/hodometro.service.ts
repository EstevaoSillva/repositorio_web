import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HodometroService {
  private apiUrl = 'http://127.0.0.1:8000/api/hodometros/';
  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getHodometro(veiculoId: number): Observable<any> {
    const url = `${this.apiUrl}?veiculo=${veiculoId}`;
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      tap((data: any) => console.log('Hodometro recebido:', data)),
      catchError(error => {
        console.error('Erro ao buscar hodometro:', error);
        return throwError(error);
      })
    );
  }

  createHodometro(veiculoId: number, hodometro: number): Observable<any> {
    return this.http.post(this.apiUrl, { veiculo: veiculoId, hodometro }, { headers: this.getHeaders() });
  }

  updateHodometro(hodometroId: number, hodometro: number, veiculo: number): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, { hodometro, veiculo }, { headers: this.getHeaders() });
  }
}










