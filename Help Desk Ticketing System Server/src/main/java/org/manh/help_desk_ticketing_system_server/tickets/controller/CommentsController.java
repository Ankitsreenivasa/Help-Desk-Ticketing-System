package org.manh.help_desk_ticketing_system_server.tickets.controller;

import org.manh.help_desk_ticketing_system_server.tickets.entity.Comments;
import org.manh.help_desk_ticketing_system_server.tickets.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @PostMapping("/comments")
    public ResponseEntity<Comments> addMessage(@RequestBody Comments message){
        return new ResponseEntity<>(commentsService.addMessage(message), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<Comments> getMessageById(@PathVariable Integer id){
        return new ResponseEntity<>(commentsService.getMessageById(id), HttpStatus.OK);
    }
}
