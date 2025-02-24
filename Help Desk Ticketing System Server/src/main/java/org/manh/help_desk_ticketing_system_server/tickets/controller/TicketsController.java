package org.manh.help_desk_ticketing_system_server.tickets.controller;

import org.manh.help_desk_ticketing_system_server.tickets.entity.Tickets;
import org.manh.help_desk_ticketing_system_server.tickets.service.TicketsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/tickets")
public class TicketsController {

    @Autowired
    private TicketsService ticketsService;

    @PostMapping
    public ResponseEntity<Tickets> createNewTickets(@RequestBody Tickets tickets){
        System.out.println(tickets);
        return new ResponseEntity<>(ticketsService.createTickets(tickets), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity <List<Tickets>> getAllTickets(){
        return new ResponseEntity<>(ticketsService.getAllTickets(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tickets> getTicketById(@PathVariable Integer id){
        return new ResponseEntity<>(ticketsService.getTicketById(id), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Tickets> updateTicket(@RequestBody Tickets tickets){
        return new ResponseEntity<>(ticketsService.updateTicket(tickets), HttpStatus.OK);
    }
}
