package tn.iit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.iit.entity.Client;
import tn.iit.service.ClientService;

import java.util.List;


@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping("/{cin}")
    public ResponseEntity<Client> getClient(@PathVariable Long cin) {
        Client client = clientService.getClientByCin(cin);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveClient(@RequestBody Client client) {
        clientService.createClient(client);
        return new ResponseEntity<>("Client saved successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cin}")
    public ResponseEntity<String> deleteClient(@PathVariable Long cin) {
        clientService.deleteClient(cin);
        return new ResponseEntity<>("Client deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCompte(@RequestBody Client client) {
        clientService.updateClient(client);
        return new ResponseEntity<>("Compte updated successfully", HttpStatus.OK);
    }
}
