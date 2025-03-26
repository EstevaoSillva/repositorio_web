import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { AuthService } from '../../service/auth-service/auth.service'; 
import { VeiculoService } from '../../service/veiculo-service/veiculo.service';
import { HodometroComponent } from '../hodometro/hodometro.component';

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
  capacidade_tanque: number;
  usuario_id: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HodometroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario: any;
  veiculos: Veiculo[] = [];
  veiculoSelecionado: number | undefined;

  constructor(
    private authService: AuthService,
    private veiculoService: VeiculoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (data) => {
        this.usuario = data;
        this.carregarVeiculos();
      },
      (error) => {
        console.error('Erro ao buscar dados do usuário', error);
      }
    );
  }

  carregarVeiculos() {
    this.veiculoService.listarVeiculosDoBanco().subscribe(
        (veiculos) => {
            console.log('Veículos recebidos:', veiculos);
            const usuarioId = this.authService.getUsuarioId();
            console.log('ID do usuário logado:', usuarioId);
            this.veiculos = veiculos.filter(veiculo => parseInt(veiculo.usuario_id) === usuarioId);
            console.log('Veículos filtrados:', this.veiculos);
            if (this.veiculos.length > 0) {
                this.veiculoSelecionado = this.veiculos[0].id;
                console.log('Veículo selecionado:', this.veiculoSelecionado);
            }
        },
        (error) => {
            console.error('Erro ao buscar veículos:', error);
        }
    );
}

  onVeiculoSelecionado(event: any) {
    this.veiculoSelecionado = event.target.value;
    console.log('Veículo selecionado:', this.veiculoSelecionado);
  }

  logout(): void {
    this.authService.logout();
  }
}