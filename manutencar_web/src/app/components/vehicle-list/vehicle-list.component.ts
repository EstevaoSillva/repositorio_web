import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VeiculoService } from '../../service/veiculo-service/veiculo.service';


interface Veiculo {
  id?: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
  capacidade_tanque: number;
}

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  veiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo | undefined;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private veiculoService: VeiculoService) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.obterVeiculos().subscribe(
      (veiculos: Veiculo[]) => {
        this.veiculos = veiculos;
      },
      (error) => {
        console.error('Erro ao carregar veículos', error);
      }
    );
  }

  selecionarVeiculo(veiculo: Veiculo) {
    this.veiculoSelecionado = { ...veiculo }; 
  }

  atualizarVeiculo() {
    if (this.veiculoSelecionado) {
      // Armazene o id antes de removê-lo
      const id = this.veiculoSelecionado.id;
      delete this.veiculoSelecionado.id;

      console.log("Dados enviados para atualização:", this.veiculoSelecionado);

      this.veiculoService.atualizarVeiculo(id!, this.veiculoSelecionado).subscribe(
        () => {
          this.mensagemSucesso = 'Veículo atualizado com sucesso!';
          this.mensagemErro = '';
          this.carregarVeiculos(); // Recarrega a lista após a atualização
        },
        (error) => {
          this.mensagemErro = 'Erro ao atualizar veículo.';
          this.mensagemSucesso = '';
          console.error('Erro ao atualizar veículo', error);
        }
      );
    }
  }

  excluirVeiculo(id: number) {
    this.veiculoService.excluirVeiculo(id).subscribe(
      () => {
        this.mensagemSucesso = 'Veículo excluído com sucesso!';
        this.mensagemErro = '';
        this.carregarVeiculos(); // Recarrega a lista após a exclusão
      },
      (error) => {
        this.mensagemErro = 'Erro ao excluir veículo.';
        this.mensagemSucesso = '';
        console.error('Erro ao excluir veículo', error);
      }
    );
  }
}