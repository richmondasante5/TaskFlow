package com.example.TaskFlow.dto;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class TaskRegisterRequest {

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
