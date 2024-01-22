import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = environments.baseURL;
  private user?: User;
  constructor(private httpClient: HttpClient) {}

  get getUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(user: string, password: string) {
    this.httpClient.get<User>(this.baseURL + `/users/${user}`);
  }
}
