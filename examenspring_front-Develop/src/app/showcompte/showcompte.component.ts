import {Component, ViewChild} from '@angular/core';
import {Comptes} from "../models/comptes";
import {ClientCompteService} from "../Services/client-compte.service";
import {MatPaginator} from "@angular/material/paginator";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-showcompte',
  templateUrl: './showcompte.component.html',
  styleUrls: ['./showcompte.component.css']
})
export class ShowcompteComponent {

  comptes: Comptes[] = [];
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientCompteService: ClientCompteService) {
  }

  ngOnInit(): void {
    this.loadComptes();

  }

  loadComptes(): void {
    this.clientCompteService.getComptes().subscribe((data) => {
      this.comptes = data;
      this.paginator.length = this.comptes.length;
    });
  }
  getIdCompte(rib:any){
    console.log(rib)
    this.clientCompteService.ribClient =rib;
    this.clientCompteService.getCompteById(this.clientCompteService.ribClient).subscribe(data=>{
      this.clientCompteService.client= data;
      console.log("dataclient",data)
      this.clientCompteService.newCin=data.client.cin
      console.log("cin est:",this.clientCompteService.newCin)
    })
  }

  deleteCompte(compte: Comptes): void {
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer ce compte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the service to delete the compte
        this.clientCompteService.deleteCompte(compte.rib).subscribe(
          () => {
            // If the deletion is successful, reload the list of comptes
            this.loadComptes();
            Swal.fire('Supprimé!', 'Le compte a été supprimé.', 'success');
          },
          (error) => {
            // Handle errors

            if (error instanceof HttpErrorResponse) {
              if (error.status === 200) {
                // If status is 200, treat it as a success
                // Reload the list of comptes
                this.loadComptes();
                Swal.fire('Supprimé!', 'Le compte a été supprimé.', 'success');
              } else {
                // Handle other HTTP errors
                Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du compte.', 'error');
              }
            } else {
              // Handle non-HTTP errors
              Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du compte.', 'error');
            }
          }
        );
      }
    });
  }




  pageChanged(event: any): void {
    this.currentPage = event.pageIndex;
  }
}
