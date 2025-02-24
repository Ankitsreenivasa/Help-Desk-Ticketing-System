package org.manh.help_desk_ticketing_system_server.auth.service;

import org.manh.help_desk_ticketing_system_server.auth.entity.Users;
import org.manh.help_desk_ticketing_system_server.auth.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    public UsersService() {
    }

    public Users registerUser (Users users){
        System.out.println(users);
        usersRepository.save(users);
        return users;
    }

    public Users findUserById(Integer id){
        return usersRepository.findById(id).orElse(null);
    }
}
