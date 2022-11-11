import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModel } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();      
    }

    store(servicio: ServicioModel): Observable<ServicioModel> {
      return this.http.post<ServicioModel>(`${this.url}/servicios`, {
        fecha: servicio.fecha,
        hora_inicio: servicio.hora_inicio,
        hora_fin: servicio.hora_fin,
        placa: servicio.placa,
        nombre_conductor: servicio.nombre_conductor,
        dinero_recogido: servicio.dinero_recogido,
        ruta: servicio.ruta
      });
    }

    getAll(): Observable<ServicioModel[]>{
      return this.http.get<ServicioModel[]>(`${this.url}/servicios`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(servicio: ServicioModel): Observable<ServicioModel> {
      return this.http.patch<ServicioModel>(`${this.url}/servicios/${servicio.id}`, {
        fecha: servicio.fecha,
        hora_inicio: servicio.hora_inicio,
        hora_fin: servicio.hora_fin,
        placa: servicio.placa,
        nombre_conductor: servicio.nombre_conductor,
        dinero_recogido: servicio.dinero_recogido,
        ruta: servicio.ruta
      }, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<ServicioModel[]>{
      return this.http.delete<ServicioModel[]>(`${this.url}/servicios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ServicioModel>{
      return this.http.get<ServicioModel>(`${this.url}/servicios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }    

    getCount(): Observable<ServicioModel[]>{
      return this.http.get<ServicioModel[]>(`${this.url}/servicios/count`, {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

}