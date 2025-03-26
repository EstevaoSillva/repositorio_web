import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../service/auth-service/auth.service';
import { VeiculoService } from '../../service/veiculo-service/veiculo.service';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { VeiculoJsonService } from '../../service/veiculo-json/veiculojson.service';


interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
  capacidade_tanque: number;
}

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, VehicleListComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {
  veiculoForm!: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  veiculosExistentes: Veiculo[] = [];
  veiculoSelecionado: Veiculo | undefined; 

  @ViewChild(VehicleListComponent) vehicleListComponent!: VehicleListComponent;

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private veiculoJsonService: VeiculoJsonService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.veiculoForm = this.fb.group({
      veiculo_selecionado: ['', Validators.required],
      placa: ['', Validators.required],
      cor: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1886), Validators.max(new Date().getFullYear())]]
    });

    this.veiculoJsonService.listarVeiculosJson().subscribe(
      (veiculos: Veiculo[]) => {
        this.veiculosExistentes = veiculos;
        // console.log(this.veiculosExistentes);
      },
      (error: any) => {
        console.error('Erro ao buscar veículos existentes', error);
      }
    );
  }

  cadastrarVeiculo() {

    if (this.veiculoForm.valid) {
      const usuario = this.authService.getUsuarioId();
      const veiculoSelecionadoId = this.veiculoForm.get('veiculo_selecionado')?.value;
      const veiculoSelecionado = this.veiculosExistentes.find(veiculo => veiculo.id === Number(veiculoSelecionadoId));
      const placa = this.veiculoForm.get('placa')?.value;
      const cor = this.veiculoForm.get('cor')?.value;
      const ano = this.veiculoForm.get('ano')?.value;

      if (veiculoSelecionado) {
        const dadosVeiculo = {
          usuario: usuario,
          marca: veiculoSelecionado.marca,
          modelo: veiculoSelecionado.modelo,
          capacidade_tanque: veiculoSelecionado.capacidade_tanque,
          placa: placa,
          cor: cor,
          ano: ano
        };

      console.log('Dados do formulário:', dadosVeiculo); // Adicione este log

      this.veiculoService.cadastrarVeiculo(dadosVeiculo).subscribe(
        (response) => {
          this.mensagemSucesso = 'Veículo cadastrado com sucesso!';
          this.mensagemErro = '';
          this.veiculoForm.reset();
          this.vehicleListComponent.carregarVeiculos();
        },
        (error) => {
          if (error && error.error && error.error.placa) {
            this.mensagemErro = 'Erro ao cadastrar veículo: ' + error.error.placa;
          } else {
            this.mensagemErro = 'Erro ao cadastrar veículo.';
          }
          this.mensagemSucesso = '';
        }
      );
      } else {
        console.log('Veículo selecionado não encontrado:', veiculoSelecionado);
        this.mensagemErro = 'Veículo selecionado não encontrado.';
        this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
        this.mensagemSucesso = '';
      }
    }
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  exibirDetalhesVeiculo() { 
    const veiculoId = this.veiculoForm.get('veiculo_selecionado')?.value;
    this.veiculoSelecionado = this.veiculosExistentes.find(veiculo => veiculo.id === Number(veiculoId));
  }

}