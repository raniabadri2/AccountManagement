import { Component } from '@angular/core';
import { ClientCompteService } from "../Services/client-compte.service";
import { Client } from "../models/clients";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent {
  client: Client = {
    cin: 0,
    nom: '',
    prenom: '',
    comptes: [], // If needed, adjust this based on your actual structure
  };

  constructor(private clientService: ClientCompteService, private router: Router) {
  } //clientService : Injecte le service ClientCompteService pour interagir avec les données des client router 
  // Injecte le service Router pour naviguer vers d'autres pages.

  onSubmit(): void {
    this.clientService.addClient(this.client).subscribe( // Appel de la méthode addClient() du service ClientCompteService
      () => {
        // Show SweetAlert success message
        Swal.fire('Succès', 'Le client a été ajouté avec succès.', 'success');
        this.router.navigate(['/showclient']);
      },
      (error: HttpErrorResponse) => {
        // Handle HTTP errors
        if (error.status === 200) {
          // Treat it as a success
          Swal.fire('Succès', 'Le client a été ajouté avec succès.', 'success');
          this.router.navigate(['/showclient']);
        } else {
          // Handle other HTTP errors
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du client.', 'error');
        }
      }
    );
  }
}
