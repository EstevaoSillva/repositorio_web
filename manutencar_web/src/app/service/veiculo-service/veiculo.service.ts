import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private apiUrl = 'http://127.0.0.1:8000/api/veiculos/'; 
  private apiUrlJson = 'http://127.0.0.1:8000/api/veiculos-json/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.localStorageService.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  listarVeiculosDoBanco(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
}

  listarVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlJson); 
  }

  cadastrarVeiculo(veiculo: any): Observable<any> {
    return this.http.post(this.apiUrl, veiculo, { headers: this.getHeaders() });
  }

  obterVeiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  obterVeiculoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  atualizarVeiculo(id: number, veiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, veiculo, { headers: this.getHeaders() });
  }

  excluirVeiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }
}