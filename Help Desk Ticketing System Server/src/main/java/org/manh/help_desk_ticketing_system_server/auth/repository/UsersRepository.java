package org.manh.help_desk_ticketing_system_server.auth.repository;

import org.manh.help_desk_ticketing_system_server.auth.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByUsername(String username);
}
