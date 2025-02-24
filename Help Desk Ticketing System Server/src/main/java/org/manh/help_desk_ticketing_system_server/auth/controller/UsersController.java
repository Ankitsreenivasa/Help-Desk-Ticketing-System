package org.manh.help_desk_ticketing_system_server.auth.controller;

import org.manh.help_desk_ticketing_system_server.auth.entity.Users;
import org.manh.help_desk_ticketing_system_server.auth.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class  UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<Users> register(@RequestBody Users user) {
        System.out.println(user);
        return new ResponseEntity<>(usersService.registerUser(user), HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Users> getUser(@PathVariable Integer id) {
        System.out.println(id);
        return new ResponseEntity<>(usersService.findUserById(id), HttpStatus.OK);
    }

}
