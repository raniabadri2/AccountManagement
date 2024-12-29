package tn.iit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.entity.Compte;
import tn.iit.repository.CompteRepository;

import java.util.List;

@Service
public class CompteService {

    @Autowired
    private CompteRepository compteRepository;

    public List<Compte> getComptesByClientCin(Long cin) {
        return compteRepository.findByClientCin(cin);
    }

    public void saveCompte(Compte compte) {
        compteRepository.save(compte);
    }

    public void updateCompte(Compte compte) {

        Compte existCompte = compteRepository.getCompteByRib(compte.getRib());
        if (existCompte != null) {
            existCompte.setSolde(compte.getSolde());
            compteRepository.save(existCompte);
        }

    }

    public Compte getCompteByRib(Long rib) {
        return compteRepository.getCompteByRib(rib);
    }

    public void deleteCompte(Long rib) {
        compteRepository.deleteById(rib);
    }

    public List<Compte> getAllComptes() {
        return compteRepository.findAll();
    }

}