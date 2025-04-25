import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import moment from 'moment'; // Importe moment corretamente

import { AbastecimentoService } from '../../service/abastecimento/abastecimento.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { VeiculoService } from '../../service/veiculo-service/veiculo.service';

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./abastecimento.component.css'],
})
export class AbastecimentoComponent implements OnInit, OnChanges {
  @Input() veiculoId: number | undefined;
  abastecimentos: any[] = [];
  novoAbastecimento: any = { veiculo: null };
  editarAbastecimento: any = {};
  veiculos: any[] = [];

  constructor(
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['veiculoId'] && !changes['veiculoId'].firstChange) {
      this.carregarAbastecimentos();
    }
  }

  irParaHome(): void {
    this.router.navigate(['/home']);
  }

  carregarVeiculos(): void {
    this.veiculoService.listarVeiculosDoBanco().subscribe(
      (veiculos) => {
        const usuarioId = this.authService.getUsuarioId();
        this.veiculos = veiculos.filter(veiculo => parseInt(veiculo.usuario_id) === usuarioId);
      },
      (error) => {
        console.error('Erro ao buscar veículos:', error);
      }
    );
  }

  carregarAbastecimentos(): void {
    if (this.veiculoId) {
      this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
        this.abastecimentos = abastecimentos.filter(abastecimento => abastecimento.veiculo === this.veiculoId).map(abastecimento => {
          if (abastecimento.data_abastecimento) {
            abastecimento.data_abastecimento = moment(abastecimento.data_abastecimento, 'DD/MM/YYYY - HH:mm').toDate();
          }
          return abastecimento;
        });
      });
    }
  }

  criarAbastecimento(): void {
    if (this.veiculoId) {
      this.novoAbastecimento.veiculo = this.veiculoId;
      this.abastecimentoService.createAbastecimento(this.novoAbastecimento).subscribe(() => {
        this.carregarAbastecimentos();
        this.novoAbastecimento = { veiculo: null };
      });
    } else {
      console.error('Nenhum veículo selecionado.');
    }
  }

  editar(abastecimento: any): void {
    this.editarAbastecimento = { ...abastecimento };
  }

  atualizarAbastecimento(): void {
    this.abastecimentoService.updateAbastecimento(this.editarAbastecimento.id, this.editarAbastecimento).subscribe(() => {
      this.carregarAbastecimentos();
      this.editarAbastecimento = {};
    });
  }

  deletarAbastecimento(id: number): void {
    this.abastecimentoService.deleteAbastecimento(id).subscribe(() => {
      this.carregarAbastecimentos();
    });
  }
}