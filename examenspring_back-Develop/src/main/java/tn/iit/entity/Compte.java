package tn.iit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor//obligatoire selon la spec JPA
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@Entity
public class Compte implements Serializable /*obligatoire selon le JPa*/ {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rib;

    @ManyToOne // Une liaison ManyToOne vers l'entité Client
    @JoinColumn(name = "client_cin") // Nom de la colonne de liaison
    private Client client;

    private float solde;


}