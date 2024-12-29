package tn.iit.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor // obligatoire selon la spec JPA
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@Entity
public class Client {
    @Id
    
    @Column(length = 15)
    private Long cin;
    private String nom;
    private String prenom;
    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private List<Compte> comptes;

}
