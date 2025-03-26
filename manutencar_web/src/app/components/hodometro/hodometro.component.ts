import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HodometroService } from '../../service/hodometro-service/hodometro.service';


@Component({
  selector: 'app-hodometro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hodometro.component.html',
  styleUrls: ['./hodometro.component.css']
})
export class HodometroComponent implements OnInit, OnChanges {
  @Input() veiculoId: number | undefined;
  hodometro: any;
  novoHodometro: number | undefined;

  constructor(
    private hodometroService: HodometroService,
  ) { }

  ngOnInit() {
    this.carregarHodometro();
    console.log('buscando id do veiculo atual hodometro component:',this.veiculoId)
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['veiculoId'] && !changes['veiculoId'].firstChange) {
      this.carregarHodometro();
    }
  }

  carregarHodometro() {
    if (this.veiculoId) {
      this.hodometroService.getHodometro(this.veiculoId).subscribe(
        (data: any) => {
          if (data && data.length > 0) {
            this.hodometro = data[data.length - 1]; // Corrigido
            this.novoHodometro = this.hodometro.hodometro;
          } else {
            this.hodometro = null;
          }
        },
        (error) => {
          console.error('Erro ao carregar hodômetro:', error);
        }
      );
    }
  }

  criarHodometro() {
    if (this.veiculoId && this.novoHodometro) {
      this.hodometroService.createHodometro(this.veiculoId, this.novoHodometro).subscribe(
        () => {
          this.carregarHodometro();
        },
        (error) => {
          console.error('Erro ao criar hodômetro:', error);
        }
      );
    }
  }

  atualizarHodometro() {
    if (this.hodometro && this.novoHodometro) {
      this.hodometroService.updateHodometro(this.hodometro.id, this.novoHodometro, this.hodometro.veiculo).subscribe( 
        () => {
          this.carregarHodometro();
        },
        (error) => {
          console.error('Erro ao atualizar hodômetro:', error);
        }
      );
    }
  }
}
