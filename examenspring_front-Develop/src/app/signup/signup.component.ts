import { Component } from '@angular/core';
import {RegisterRequest} from "../models/register-request";
import {AuthenticationResponse} from "../models/authentication-response";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  registerUser() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
            console.log(response);
            Swal.fire('Inscription réussie!', 'Votre compte a été créé avec succès.', 'success');
            this.router.navigate(['']); // Redirect to the desired page
          } else {
            // Inform the user with a more user-friendly message
            Swal.fire('Compte créé!', 'Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion dans 3 secondes.', 'success');
            setTimeout(() => this.router.navigate(['login']), 3000); // Redirect after 3 seconds
          }
        }
      });
  }


}
