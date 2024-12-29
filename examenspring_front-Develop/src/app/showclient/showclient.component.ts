import { Component, ViewChild } from '@angular/core';
import { Client } from '../models/clients';
import { ClientCompteService } from '../Services/client-compte.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-showclient',
  templateUrl: './showclient.component.html',
  styleUrls: ['./showclient.component.css'],
})
export class ShowclientComponent {
  clients: Client[] = [];
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientService: ClientCompteService) {

  }

  ngOnInit(): void {
    this.loadClients();
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      this.paginator.length = this.clients.length;
    });
  }
  getIdClient(cin:any){
    console.log(cin)
    this.clientService.cinClient =cin;
    this.clientService.getClientById(this.clientService.cinClient).subscribe(data=>{
      this.clientService.client= data;
      console.log("dataclient",data)
    })
  }
    deleteClient(client: Client): void {
      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment supprimer ce client?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the service to delete the client
          this.clientService.deleteClient(client.cin).subscribe(
            () => {
              // If the deletion is successful, reload the list of clients
              this.loadClients();
              Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
            },
            (error) => {
              // Handle errors

              if (error instanceof HttpErrorResponse) {
                if (error.status === 200) {
                  // If status is 200, treat it as a success
                  // Reload the list of clients
                  this.loadClients();
                  Swal.fire('Supprimé!', 'Le client a été supprimé.', 'success');
                } else {
                  // Handle other HTTP errors
                  Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du client.', 'error');
                }
              } else {
                // Handle non-HTTP errors
                Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du client.', 'error');
              }
            }
          );
        }
      });
    }
  }

