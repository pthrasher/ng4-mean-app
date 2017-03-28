import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Model } from './model';
import { Make } from './make';

@Injectable()
export class ModelService {
  constructor(private http: Http) { }

  getModelsForMake(make: Make): Promise<Model[]> {
    // TODO: http request
    return this.http.get('/api/models?makeName=' + make.makeName)
      .toPromise()
      .then(resp => resp.json() as Model[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
