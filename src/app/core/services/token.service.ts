
// token.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class TokenService {

    getToken(token_key: string): string | null {
      return localStorage.getItem(token_key);
    }

    setToken(token_key: string, token: string): void {
      localStorage.setItem(token_key, token);
    }

    removeToken(token_key: string): void {
      localStorage.removeItem(token_key);
    }

    isValidToken(token_key: string): boolean {
      const token = this.getToken(token_key);
      return !!token;
    }

    setProperty(name: string, data: string | User  ){
      const dataString = JSON.stringify(data) ?? '';
      localStorage.setItem(name, dataString);
    }

}
