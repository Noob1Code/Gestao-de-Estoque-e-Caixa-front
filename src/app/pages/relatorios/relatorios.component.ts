
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendaService } from '../../core/services/venda.service';
import { VendaResponseDTO } from '../../core/models/venda.dto';
import { MessageService } from 'primeng/api';

// Importações PrimeNG
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    InputTextModule
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  private vendaService = inject(VendaService);
  private messageService = inject(MessageService);

  vendas: VendaResponseDTO[] = [];

  // Modelos para os filtros
  dataInicio: Date | null = null;
  dataFim: Date | null = null;

  // Modelos para os Totais
  totalGeralVendido: number = 0;
  totalItensVendidos: number = 0; // O GC precisa calcular e me devolver

  ngOnInit(): void {
    this.carregarVendas();
  }

  // Busca vendas dentro do Back
  carregarVendas(): void {
    const filtros = {
      dataInicio: this.dataInicio,
      dataFim: this.dataFim
    };

    this.vendaService.listarVendas(filtros).subscribe({
      next: (data) => {
        this.vendas = data;
        this.calcularTotais();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar relatórios.' });
      }
    });
  }

  // Fz o calculo com base no que foi carregado do Back
  calcularTotais(): void {
    // Total R$ Vendido
    this.totalGeralVendido = this.vendas.reduce((sum, venda) => sum + venda.total, 0);
    // Soma a quantidade de cada item em cada venda
    this.totalItensVendidos = this.vendas.reduce((sumVendas, venda) => {
      // Soma os itens *dentro* de uma venda
      const itensNestaVenda = venda.itens.reduce((sumItens, item) => sumItens + item.quantidade, 0);
      return sumVendas + itensNestaVenda;
    }, 0);
  }

  // So recarrega, a logica de filtro e do GC
  aplicarFiltros(): void {
    this.carregarVendas();
  }

  limparFiltros(): void {
    this.dataInicio = null;
    this.dataFim = null;
    this.carregarVendas();
  }
}