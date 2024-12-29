import { Component } from '@angular/core';
import {Comptes} from "../models/comptes";
import {ClientCompteService} from "../Services/client-compte.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../models/clients";

@Component({
  selector: 'app-ajout-compte',
  templateUrl: './ajout-compte.component.html',
  styleUrls: ['./ajout-compte.component.css']
})
export class AjoutCompteComponent {
  client: Client = {
    cin: 0,
    nom: '',
    prenom: '',
    comptes: []  // Start with an empty array for comptes
  };

  compte: Comptes = {
    rib: 0,
    client: { cin: 0, nom: '', prenom: '' },  // Initialize client if needed
    solde: 0.0,
  };

  constructor(private compteService: ClientCompteService, private router: Router) {
  }

  onSubmit(): void {
    // Check if client and compte are defined before accessing their properties
    if (this.client?.comptes && this.compte) {
      // Add the compte to the client's comptes array
      this.client.comptes.push(this.compte);

      this.compteService.addCompte(this.compte).subscribe(
        () => {
          // Show SweetAlert success message
          Swal.fire('Succès', 'Le compte a été ajouté avec succès.', 'success');
          this.router.navigate(['/showcompte']);
        },
        (error: HttpErrorResponse) => {
          // Handle HTTP errors
          if (error.status === 200) {
            // Treat it as a success
            Swal.fire('Succès', 'Le compte a été ajouté avec succès.', 'success');
            this.router.navigate(['/showcompte']);
          } else {
            // Handle other HTTP errors
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du compte.', 'error');
          }
        }
      );
    }
  }




}



