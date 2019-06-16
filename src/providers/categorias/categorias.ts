import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../config/config';
/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CategoriasProvider {
  constructor(public http: Http) {
  }

  getCategorias() {
	  return this.http.get(`${AppConfig.API_URL}/categoria`)
	  .map(res => res.json())
	  .toPromise();
	}

  getEventos() {
    return this.http.get(`${AppConfig.API_URL}/producto/eventos`)
    .map(res => res.json())
    .toPromise();
  }

  getComentarios(id) {
    return this.http.get(`${AppConfig.API_URL}/comentario/comentarios/${id}`)
    .map(res => res.json())
    .toPromise();
  }

  addComentario(comment) {
    return this.http.post(`${AppConfig.API_URL}/comentario`, comment)
    .map(res => res.json())
    .toPromise();
  }

}
