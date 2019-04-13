import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../config/config';
/*
  Generated class for the ProvidersClientesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProvidersClientesProvider {
  
  constructor(public http: Http) {
    
  }

  getClientes(categoria) {
	  return this.http.get(`${AppConfig.API_URL}/proveedor/categoria/${categoria}`)
	  .map(res => res.json())
	  .toPromise();
	}

  getEventos(id) {
    return this.http.get(`${AppConfig.API_URL}/producto/categoria/${id}`)
    .map(res => res.json())
    .toPromise();
  }

  getComentarios(id) {
    return this.http.get(`${AppConfig.API_URL}/comentario/comentarios/${id}`)
    .map(res => res.json())
    .toPromise();
  }

  getSliders() {
    return this.http.get(`${AppConfig.API_URL}/slider`)
    .map(res => res.json())
    .toPromise();
  }

  addComentario(comment) {
    return this.http.post(`${AppConfig.API_URL}/comentario`, comment)
    .map(res => res.json())
    .toPromise();
  }

}
