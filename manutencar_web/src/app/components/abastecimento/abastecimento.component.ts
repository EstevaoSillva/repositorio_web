import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 


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
export class AbastecimentoComponent implements OnInit {
  abastecimentos: any[] = [];
  novoAbastecimento: any = { veiculo: null }; // Adicione o campo veículo aqui
  editarAbastecimento: any = {};
  veiculos: any[] = []; // Adicione a lista de veículos aqui
  veiculoSelecionado: number | null = null; // Adicione a propriedade veiculoSelecionado aqui

  constructor(
    private abastecimentoService: AbastecimentoService,
    private veiculoService: VeiculoService,
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.getAbastecimentos();
    this.carregarVeiculos(); 
  }

  getAbastecimentos(): void {
    this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
      this.abastecimentos = abastecimentos.map(abastecimento => {
        if (abastecimento.data_abastecimento) {
          abastecimento.data_abastecimento = new Date(abastecimento.data_abastecimento.replace(' ', 'T'));
        }
        return abastecimento;
      });
    });
  }

  irParaHome(): void {
    this.router.navigate(['/home']); 
  }

  carregarVeiculos(): void {
    this.veiculoService.listarVeiculosDoBanco().subscribe(
      (veiculos) => {
        console.log('Veículos recebidos:', veiculos);
        const usuarioId = this.authService.getUsuarioId();
        console.log('ID do usuário logado:', usuarioId);
        this.veiculos = veiculos.filter(veiculo => parseInt(veiculo.usuario_id) === usuarioId);
        console.log('Veículos filtrados:', this.veiculos);
        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0].id;
          this.carregarAbastecimentos();
          console.log('Veículo selecionado:', this.veiculoSelecionado);
        }
      },
      (error) => {
        console.error('Erro ao buscar veículos:', error);
      }
    );
  }

  carregarAbastecimentos(): void {
    if (this.veiculoSelecionado) {
      this.abastecimentoService.getAbastecimentos().subscribe(abastecimentos => {
        this.abastecimentos = abastecimentos.filter(abastecimento => abastecimento.veiculo === this.veiculoSelecionado);
      });
    }
  }

  convertDate(dateString: string): Date | null {
    const parts = dateString.split(' - ');
    if (parts.length === 2) {
      const dateParts = parts[0].split('/');
      const timeParts = parts[1].split(':');
      if (dateParts.length === 3 && timeParts.length === 2) {
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed
        const day = parseInt(dateParts[0], 10);
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        return new Date(year, month, day, hours, minutes);
      }
    }
    return null;
  }

  criarAbastecimento(): void {
    // Certifique-se de que veiculoSelecionado esteja definido antes de criar o abastecimento
    if (this.veiculoSelecionado) {
      this.novoAbastecimento.veiculo = this.veiculoSelecionado;
      this.abastecimentoService.createAbastecimento(this.novoAbastecimento).subscribe(() => {
        this.getAbastecimentos();
        this.novoAbastecimento = { veiculo: null }; // Reseta o novoAbastecimento
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
      this.getAbastecimentos();
      this.editarAbastecimento = {};
    });
  }

  deletarAbastecimento(id: number): void {
    this.abastecimentoService.deleteAbastecimento(id).subscribe(() => {
      this.getAbastecimentos();
    });
  }
}