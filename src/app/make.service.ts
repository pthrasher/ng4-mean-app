import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Make } from './make';

@Injectable()
export class MakeService {
  constructor(private http: Http) { }

  getMakes(): Promise<Make[]> {
    // TODO: http request
    return this.http.get('/api/makes')
      .toPromise()
      .then(resp => resp.json() as Make[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
