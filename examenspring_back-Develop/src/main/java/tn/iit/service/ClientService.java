package tn.iit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.iit.entity.Client;
import tn.iit.repository.ClientRepository;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
    
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientByCin(Long cin) {
        return clientRepository.findById(cin).orElse(null); 
    }
    public void updateClient(Client client) {
        clientRepository.save(client);
    }

    public void deleteClient(Long cin) {
        clientRepository.deleteById(cin); 
    }


    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

}