package org.manh.help_desk_ticketing_system_server.tickets.service;

import org.manh.help_desk_ticketing_system_server.tickets.entity.Tickets;
import org.manh.help_desk_ticketing_system_server.auth.entity.Users;

import org.manh.help_desk_ticketing_system_server.tickets.repository.TicketsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.manh.help_desk_ticketing_system_server.auth.repository.UsersRepository;

import java.util.List;

@Service
public class TicketsService {

    @Autowired
    private TicketsRepository ticketsRepository;

    @Autowired
    private UsersRepository usersRepository;

    public TicketsService() {
    }

    public Tickets createTickets(Tickets tickets){
        // Set a default value for created_by if not provided
        try {
            if (tickets.getCreatedBy() == null) {
                Users user = this.usersRepository.findById(1)
                        .orElseThrow(() -> new Exception("User not found with id: " + 1));

                System.out.println(user);

                tickets.setCreatedBy(user); // Or any other default value
            }

            return ticketsRepository.save(tickets);

        }catch (Exception e){
            e.printStackTrace();
        }
        return tickets;
    }

    public List<Tickets> getAllTickets(){
        return ticketsRepository.findAll();
    }

    public Tickets getTicketById(Integer id){
        return ticketsRepository.findById(id).orElse(null);
    }

    public Tickets updateTicket(Tickets tickets){
        return ticketsRepository.save(tickets);
    }
}
