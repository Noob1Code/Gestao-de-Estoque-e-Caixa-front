import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VendaRequestDTO, VendaResponseDTO } from '../models/venda.dto';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private apiUrl = 'http://localhost:8080/api/vendas';
  private http = inject(HttpClient);

  registrarVenda(venda: VendaRequestDTO): Observable<VendaResponseDTO> {
    return this.http.post<VendaResponseDTO>(this.apiUrl, venda);
  }

  listarVendas(filtros?: any): Observable<VendaResponseDTO[]> {
    let params = new HttpParams();
    if (filtros && filtros.dataInicio) {
        const dataInicioString = new Date(filtros.dataInicio).toISOString().split('T')[0];
        params = params.append('dataInicio', dataInicioString);
    }
    if (filtros && filtros.dataFim) {
        let dataFim = new Date(filtros.dataFim);
        dataFim.setDate(dataFim.getDate() + 1); 
        const dataFimString = dataFim.toISOString().split('T')[0];
        params = params.append('dataFim', dataFimString);
    }
    return this.http.get<VendaResponseDTO[]>(this.apiUrl, { params });
  }
}