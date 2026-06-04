package com.example.TaskFlow.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity

@Table(name = "tasks")//PostgreSQL table name
public class Task {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(nullable=false)//fields cannot be null but keep null for test purposes
    private String taskName;
    private String taskDescription;
    public enum Status{STARTED, COMPLETED, PENDING}

    //storing enum as text in postgreSQL
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne//many task can be assigned to one User
    @JoinColumn(name = "user_id")
    private User assignedTo;//task assigned to the object of the User Class

    //automatic time stamp will be used later
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
