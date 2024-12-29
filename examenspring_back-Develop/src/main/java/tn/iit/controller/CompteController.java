package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iit.entity.Compte;
import tn.iit.service.CompteService;

import java.util.List;

@RestController
@RequestMapping("/comptes")
public class CompteController {
    @Autowired
    private CompteService compteService;

    @GetMapping("/{rib}")
    public ResponseEntity<Compte> getCompte(@PathVariable Long rib) {
        Compte compte = compteService.getCompteByRib(rib);
        if (compte != null) {
            return new ResponseEntity<>(compte, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCompte(@RequestBody Compte compte) {
        compteService.saveCompte(compte);
        return new ResponseEntity<>("Compte saved successfully", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCompte(@RequestBody Compte compte) {
        compteService.updateCompte(compte);
        return new ResponseEntity<>("Compte updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{rib}")
    public ResponseEntity<String> deleteCompte(@PathVariable Long rib) {
        compteService.deleteCompte(rib);
        return new ResponseEntity<>("Compte deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Compte>> getAllComptes() {
        List<Compte> comptes = compteService.getAllComptes();
        return new ResponseEntity<>(comptes, HttpStatus.OK);
    }
}
