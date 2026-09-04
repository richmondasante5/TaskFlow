package com.example.TaskFlow.service;

import com.example.TaskFlow.dto.TaskRegisterRequest;
import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.TaskRepository;
import com.example.TaskFlow.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.AssertionErrors.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    // Fake TaskRepository dependency used by TaskService
    @Mock
    private TaskRepository taskRepository;

    // Fake UserRepository dependency used by TaskService
    @Mock
    private UserRepository userRepository;

    // Real TaskService being tested; Mockito injects the fake dependencies above
    @InjectMocks
    private TaskService taskService;


    // Test creating and saving a new task
    @Test
    void createTask_shouldCreateAndSaveTask() {

        // Arrange
        TaskRegisterRequest request = new TaskRegisterRequest();
        request.setTaskName("Complete TaskFlow Testing");
        request.setTaskDescription("Write JUnit and Mockito tests");

        when(taskRepository.save(any(Task.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Task result = taskService.createTask(request);

        // Assert
        assertEquals(
                "Task name should match",
                "Complete TaskFlow Testing",
                result.getTaskName()
        );

        assertEquals(
                "Task description should match",
                "Write JUnit and Mockito tests",
                result.getTaskDescription()
        );

        assertEquals(
                "New task status should be PENDING",
                Task.Status.PENDING,
                result.getStatus()
        );

        assertNotNull(
                "Created date should be set",
                result.getCreatedAt()
        );

        verify(taskRepository).save(any(Task.class));
    }


    // Test getting all tasks
    @Test
    void getAllTasks_shouldReturnAllTasks() {

        // Arrange
        Task task1 = new Task();
        task1.setId(1L);

        Task task2 = new Task();
        task2.setId(2L);

        List<Task> tasks = List.of(task1, task2);

        when(taskRepository.findAll())
                .thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(
                "All tasks should be returned",
                tasks,
                result
        );
    }


    // Test finding an existing task
    @Test
    void getTaskById_shouldReturnTask_whenTaskExists() {

        // Arrange
        Task task = new Task();
        task.setId(1L);
        task.setTaskName("TaskFlow Testing");

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        // Act
        Task result = taskService.getTaskById(1L);

        // Assert
        assertEquals(
                "Task ID should match",
                task.getId(),
                result.getId()
        );
    }


    // Test finding a task that does not exist
    @Test
    void getTaskById_shouldReturnNull_whenTaskDoesNotExist() {

        // Arrange
        when(taskRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act
        Task result = taskService.getTaskById(99L);

        // Assert
        assertNull(
                "Task should not be found",
                result
        );
    }


    // Test deleting a task
    @Test
    void deleteById_shouldDeleteTaskById() {

        // Act
        taskService.deleteById(1L);

        // Assert
        verify(taskRepository).deleteById(1L);
    }


    // Test updating an existing task
    @Test
    void updateTaskRecord_shouldUpdateExistingTask() {

        // Arrange
        Task existingTask = new Task();
        existingTask.setId(1L);
        existingTask.setTaskName("Old Task");
        existingTask.setTaskDescription("Old Description");
        existingTask.setStatus(Task.Status.PENDING);

        Task updatedTask = new Task();
        updatedTask.setTaskName("Updated Task");
        updatedTask.setTaskDescription("Updated Description");

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(existingTask));

        when(taskRepository.save(existingTask))
                .thenReturn(existingTask);

        // Act
        Task result = taskService.updateTaskRecord(1L, updatedTask);

        // Assert
        assertEquals(
                "Task name should be updated",
                "Updated Task",
                result.getTaskName()
        );

        assertEquals(
                "Task description should be updated",
                "Updated Description",
                result.getTaskDescription()
        );

        verify(taskRepository).save(existingTask);
    }


    // Test updating a task that does not exist
    @Test
    void updateTaskRecord_shouldReturnNull_whenTaskDoesNotExist() {

        // Arrange
        Task updatedTask = new Task();
        updatedTask.setTaskName("Updated Task");

        when(taskRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act
        Task result = taskService.updateTaskRecord(99L, updatedTask);

        // Assert
        assertNull(
                "Task should not be updated if task does not exist",
                result
        );

        verify(taskRepository, never()).save(any(Task.class));
    }


    // Test assigning an existing task to an existing user
    @Test
    void assignTaskToUser_shouldAssignUser_whenTaskAndUserExist() {

        // Arrange
        Task task = new Task();
        task.setId(1L);

        User user = new User();
        user.setId(2L);
        user.setEmail("richmond@test.com");

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(userRepository.findById(2L))
                .thenReturn(Optional.of(user));

        when(taskRepository.save(task))
                .thenReturn(task);

        // Act
        Task result = taskService.assignTaskToUser(1L, 2L);

        // Assert
        assertEquals(
                "Assigned user should match",
                user,
                result.getAssignedTo()
        );

        verify(taskRepository).save(task);
    }


    // Test assigning when task does not exist
    @Test
    void assignTaskToUser_shouldReturnNull_whenTaskDoesNotExist() {

        // Arrange
        when(taskRepository.findById(99L))
                .thenReturn(Optional.empty());

        when(userRepository.findById(2L))
                .thenReturn(Optional.of(new User()));

        // Act
        Task result = taskService.assignTaskToUser(99L, 2L);

        // Assert
        assertNull(
                "Assignment should fail when task does not exist",
                result
        );

        verify(taskRepository, never()).save(any(Task.class));
    }


    // Test assigning when user does not exist
    @Test
    void assignTaskToUser_shouldReturnNull_whenUserDoesNotExist() {

        // Arrange
        Task task = new Task();
        task.setId(1L);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act
        Task result = taskService.assignTaskToUser(1L, 99L);

        // Assert
        assertNull(
                "Assignment should fail when user does not exist",
                result
        );

        verify(taskRepository, never()).save(any(Task.class));
    }
}