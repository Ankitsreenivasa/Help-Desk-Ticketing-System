package org.manh.help_desk_ticketing_system_server.tickets.repository;

import org.manh.help_desk_ticketing_system_server.tickets.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Integer> {
}
