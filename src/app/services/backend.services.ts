import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { BACKEND_URL } from "../config/config";

@Injectable()
export class BackendService {
  constructor(private userService: UserService, private http: HttpClient) { }

  concat_url(url) {
    if (url.indexOf(BACKEND_URL) !== 0) {
      url = BACKEND_URL + url;
    }
    console.log(url);
    return url;
  }

  post(url: string, data: any): any {

    const httpOptions = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': sessionStorage.getItem('user.token')
      // 'x-auth-token': sessionStorage.getItem('user.token')
    });

    return this.http.post(this.concat_url(url), data, { headers: httpOptions });
  }

  get(url: string): any {

    const httpOptions = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': sessionStorage.getItem('user.token')
        // 'x-auth-token': sessionStorage.getItem('user.token')
      });

    return this.http.get(this.concat_url(url), { headers: httpOptions, observe: 'response' });
  }



  private trimData(data: any): any {
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'string' || data[key] instanceof String) {
        let temp = data[key].trim();
        if (temp.lastIndexOf('%') === temp.length - 1 && temp.length > 1) {
          while (temp.lastIndexOf('%') === temp.length - 1) {
            temp = temp.substring(0, temp.length - 1);
          }
          temp = temp.trim() + '%';
        }
        data[key] = temp;
      }
      if (data[key] !== null && typeof data[key] === 'object') {
        data[key] = this.trimData(data[key]);
      }
    });
    return data;
  }
}
