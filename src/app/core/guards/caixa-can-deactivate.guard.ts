import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CaixaComponent } from '../../pages/caixa/caixa.component'; 
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

export const CaixaCanDeactivateGuard: CanDeactivateFn<CaixaComponent> = (
  component: CaixaComponent
) => {
  // 1. Condição: Se o carrinho estiver vazio, permite a saída imediatamente.
  if (component.itensVenda.length === 0) {
    return true;
  }
  
  // 2. Se houver itens, solicita confirmação via Observable.
  return new Observable<boolean>(observer => {
    const confirmationService = inject(ConfirmationService); 

    confirmationService.confirm({
      message: 'Você tem itens no carrinho. Deseja realmente sair e perder esta venda?',
      header: 'Atenção: Venda em Andamento',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, Sair',
      rejectLabel: 'Não, Continuar Editando',
      accept: () => {
        // Opcional: Limpa o carrinho antes de permitir a saída
        component.cancelarVenda(); 
        observer.next(true); 
        observer.complete();
      },
      reject: () => {
        // Bloqueia a saída
        observer.next(false);
        observer.complete();
      }
    });
  });
};