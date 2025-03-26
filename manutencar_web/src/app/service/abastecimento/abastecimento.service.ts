import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { LocalStorageService } from '../local-storage/local-storage.service'; 


@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {
  private apiUrl = 'http://127.0.0.1:8000/api/abastecimentos/'; // Ajuste a URL se necessário

  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService
  ) { } 
  getAbastecimentos(): Observable<any[]> {
    const token = this.localStorageService.getItem('token'); // Obtém o token do Local Storage
    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
      }
    });
  }

  createAbastecimento(abastecimento: any): Observable<any> {
    const token = this.localStorageService.getItem('token'); // Obtém o token do Local Storage
    return this.http.post<any>(this.apiUrl, abastecimento, {
      headers: {
        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
      }
    });
  }

  updateAbastecimento(id: number, abastecimento: any): Observable<any> {
    const token = this.localStorageService.getItem('token'); // Obtém o token do Local Storage
    return this.http.put<any>(`${this.apiUrl}${id}/`, abastecimento, {
      headers: {
        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
      }
    });
  }

  deleteAbastecimento(id: number): Observable<any> {
    const token = this.localStorageService.getItem('token'); // Obtém o token do Local Storage
    return this.http.delete<any>(`${this.apiUrl}${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho da requisição
      }
    });
  }
}