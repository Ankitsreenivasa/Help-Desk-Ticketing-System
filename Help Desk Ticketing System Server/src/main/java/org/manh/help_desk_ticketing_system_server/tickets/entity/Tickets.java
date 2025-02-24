package org.manh.help_desk_ticketing_system_server.tickets.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.manh.help_desk_ticketing_system_server.auth.entity.Users;

import java.time.LocalDateTime;

enum TicketStatus {
    Open, InProgress, Resolved, Closed
}

enum TicketPriority {
    Low, Medium, High
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tickets")
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    private TicketPriority priority;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private Users createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to", nullable = true)
    private Users assignedTo;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
