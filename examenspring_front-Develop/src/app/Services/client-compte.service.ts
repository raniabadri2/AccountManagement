    import { Injectable } from '@angular/core';
    import {HttpClient} from "@angular/common/http";
    import {Client} from "../models/clients";
    import {Observable} from "rxjs";
    import {Comptes} from "../models/comptes";

    @Injectable({
      providedIn: 'root'
    })
    export class ClientCompteService {
      newCin:any
      cinClient:any;
      client:any;
      ribClient:any;
      compte:any;

      private apiUrl = 'http://localhost:8889/clients';
      private apiUrlComptes = 'http://localhost:8889/comptes';

      constructor(private http: HttpClient) {}

      getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}/all`);
      }
      deleteClient(cin: any): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${cin}`);
      }
      addClient(client: Client): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/save`, client);
      }

      updateClient(client: Client): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/update`, client);
      }

      getClientById(cin: any): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}/${this.cinClient}`);
      }
      getComptes(): Observable<Comptes[]> {
        return this.http.get<Comptes[]>(`${this.apiUrlComptes}/all`);
      }
      deleteCompte(rib: any): Observable<void> {
        return this.http.delete<void>(`${this.apiUrlComptes}/delete/${rib}`);
      }
      addCompte(comptes: Comptes): Observable<void> {
        return this.http.post<void>(`${this.apiUrlComptes}/save`, comptes);
      }

      updateCompte(comptes: Comptes): Observable<void> {
        return this.http.put<void>(`${this.apiUrlComptes}/update`, comptes);
      }

      getCompteById(rib: any): Observable<Comptes> {
        return this.http.get<Comptes>(`${this.apiUrlComptes}/${rib}`);
      }




    }
