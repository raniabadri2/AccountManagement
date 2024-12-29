import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientCompteService} from '../Services/client-compte.service';
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  clientUpdated: any;
  client: { cin: number; nom: string; prenom: string } = {
    cin: 0,
    nom: '',
    prenom: ''

  };

  constructor(
    private clientService: ClientCompteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getClient();
  }


  getClient(): void {

    const cin = +this.route.snapshot.params['cin'];
    console.log("cinclient",this.clientService.cinClient)
    this.clientService.getClientById(this.clientService.cinClient)
      .subscribe(el => {

          this.clientUpdated = el
          this.client.cin = this.clientUpdated.cin;
          this.client.nom = this.clientUpdated.nom;
          this.client.prenom =this.clientUpdated.prenom;
          this.clientService.client = this.client

        }
      );
  }

  onSubmit(): void {
    // Ensure that the updateClients method expects a single Comptes object, not an array
    this.clientService.updateClient(this.client).subscribe(
      () => {
        // Show SweetAlert success message
        Swal.fire('Success', 'Client updated successfully.', 'success');
        this.router.navigate(['/showclient']);
      },
      (error: HttpErrorResponse) => {
        // Handle HTTP errors
        if (error.status === 200) {
          // Treat it as a success
          Swal.fire('Success', 'Client updated successfully.', 'success');
          this.router.navigate(['/showclient']);
        } else {
          // Handle other HTTP errors
          Swal.fire('Error', 'An error occurred while updating the client.', 'error');
        }
      }
    );
  }
}

