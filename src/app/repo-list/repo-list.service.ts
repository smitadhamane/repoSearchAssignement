import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from './repo';

@Injectable({
  providedIn: 'root'
})
export class RepoListService {

  constructor(private http: HttpClient) { }

  getRepoList(userName:string){
    const url = " https://api.github.com/users/";
    return this.http.get<Repo[]>(url+userName+'/repos');
  }
}
