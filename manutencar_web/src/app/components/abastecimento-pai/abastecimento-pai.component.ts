import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VeiculoService } from '../../service/veiculo-service/veiculo.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { AbastecimentoComponent } from '../abastecimento/abastecimento.component'; 

@Component({
  selector: 'app-abastecimento-pai',
  standalone: true,
  imports: [FormsModule, CommonModule, AbastecimentoComponent], 
  templateUrl: './abastecimento-pai.component.html',
})
export class AbastecimentoPaiComponent implements OnInit {
  veiculos: any[] = [];
  veiculoSelecionado: number | undefined;

  constructor(private veiculoService: VeiculoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculoService.listarVeiculosDoBanco().subscribe(
      (veiculos) => {
        console.log('Veículos recebidos:', veiculos);
        const usuarioId = this.authService.getUsuarioId();
        this.veiculos = veiculos.filter(veiculo => parseInt(veiculo.usuario_id) === usuarioId);
        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0].id;
        }
        console.log('Veículos filtrados:', this.veiculos);
      },
      (error) => {
        console.error('Erro ao buscar veículos:', error);
      }
    );
  }

  onVeiculoChange(): void {
    // Atualiza o veiculoId passado para o AbastecimentoComponent
  }
}