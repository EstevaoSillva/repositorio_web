import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoJsonService {
  private apiUrlJson = 'http://127.0.0.1:8000/api/veiculos-json/';

  constructor(private http: HttpClient) { }

  listarVeiculosJson(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlJson);
  }
}