// client.model.ts

import {Comptes} from "./comptes";

export interface Client {
  cin: any;
  nom: string;
  prenom: string;
  comptes?: Comptes[];

}
