package org.manh.help_desk_ticketing_system_server.tickets.service;

import org.manh.help_desk_ticketing_system_server.tickets.entity.Comments;
import org.manh.help_desk_ticketing_system_server.tickets.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    public CommentsService() {
    }

    public Comments addMessage(Comments message){
        commentsRepository.save(message);
        return message;
    }

    public Comments getMessageById(Integer id){
        return commentsRepository.findById(id).orElse(null);
    }

}
