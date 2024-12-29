import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {ClientCompteService} from '../Services/client-compte.service';
import {Comptes} from '../models/comptes';

@Component({
  selector: 'app-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.css']
})
export class EditCompteComponent implements OnInit {
  compteUpdated: any
  dataClients:string =""
  compte: Comptes = {
    rib: 0,
    client: {cin: 0, nom: '', prenom: ''},
    solde: 0.0,
  };


  constructor(
    private route: ActivatedRoute,
    private compteService: ClientCompteService,
    private router: Router
  ) {
    this.dataClients =this.dataClients
  }

  ngOnInit(): void {

    this.getCompte();


  }


  getCompte(): void {

    const rib = +this.route.snapshot.params['rib'];
    console.log("ribclient", this.compteService.ribClient)
    this.compteService.getCompteById(this.compteService.ribClient)
      .subscribe(el => {

          this.compteUpdated = el
          this.compte.rib = this.compteUpdated.rib;
          this.compte.solde = this.compteUpdated.solde;
          this.compteService.compte = this.compte

        }
      );
  }


  onSubmit(): void {
    // Ensure that the updateCompte method expects a single Comptes object, not an array
    this.compteService.updateCompte(this.compte).subscribe(
      () => {
        // Show SweetAlert success message
        Swal.fire('Success', 'Compte updated successfully.', 'success');
        this.router.navigate(['/showcompte']);
      },
      (error: HttpErrorResponse) => {
        // Handle HTTP errors
        if (error.status === 200) {
          // Treat it as a success
          Swal.fire('Success', 'Compte updated successfully.', 'success');
          this.router.navigate(['/showcompte']);
        } else {
          // Handle other HTTP errors
          Swal.fire('Error', 'An error occurred while updating the compte.', 'error');
        }
      }
    );
  }
}
