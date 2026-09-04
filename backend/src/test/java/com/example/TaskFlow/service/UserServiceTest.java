package com.example.TaskFlow.service;

import com.example.TaskFlow.dto.LoginResponse;
import com.example.TaskFlow.dto.UserRegisterRequest;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import com.example.TaskFlow.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.AssertionErrors.assertEquals;

// Enables Mockito in this JUnit test class so @Mock and @InjectMocks can be used.
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    // Fake UserRepository dependency used by UserService
    @Mock
    private UserRepository userRepository;

    // Fake JwtService dependency used by UserService
    @Mock
    private JwtService jwtService;

    // Real UserService being tested; Mockito injects the fake dependencies above
    @InjectMocks
    private UserService userService;


    // Test finding a user with a valid ID
    @Test
    void findUserById_shouldReturnUser_whenUserExists(){
        User user = new User();
        user.setId(1L);
        user.setEmail("asanterich@mail.com");

        //MOCKITO PART
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        //Act
        User results = userService.findUserById(1L);

        //ASSERT
        assertEquals("User ID should match: ", results.getId(), user.getId());
    }

    //Test finding a user with invalid that does not exist
    @Test
    void findUserById_shouldReturnNull_whenUserDoesNotExist() {

        // Arrange
        when(userRepository.findById(10L)).thenReturn(Optional.empty());

        // Act
        User notFoundResult = userService.findUserById(10L);

        //ASSERT
        assertNull(notFoundResult, "User should not be found");
    }

    //Test retrieving all Users
    @Test
    void getAllUsers_shouldReturnAllUsers(){

        //arrange
        User user1 = new User();
        user1.setId(1L);

        User user2 = new User();
        user2.setId(2L);

        List<User> users = List.of(user1, user2);
        when(userRepository.findAll()).thenReturn(users);

        //act
        List<User> findAllUsersResults = userService.getAllUsers();

        //assert
        assertEquals("All users should be returned",findAllUsersResults, users);
    }

    @Test
    void deleteUser_shouldDeleteUserById() {

        // Act
        userService.deleteUser(1L);

        // Assert
        verify(userRepository).deleteById(1L);
    }

    // Test creating and saving a new user
    @Test
    void createUser_shouldCreateAndSaveUser() {

        // Arrange - create the registration data
        UserRegisterRequest request = new UserRegisterRequest();
        request.setFirstName("Richmond");
        request.setLastName("Asante");
        request.setPhone("1234567890");
        request.setEmail("richmond@test.com");
        request.setPassword("password123");

        // When any User is saved, return that same User
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act - call the real createUser method
        User result = userService.createUser(request);

        // Assert - verify the created user's information
        assertEquals("First name should match", "Richmond", result.getFirstName());
        assertEquals("Last name should match", "Asante", result.getLastName());
        assertEquals("Email should match", "richmond@test.com", result.getEmail());
        assertEquals("Phone number should match", "1234567890", result.getPhone());

        // createUser automatically assigns USER role
        assertEquals("Default role should be USER", "USER", result.getRole());

        // Password should have been BCrypt hashed, not stored as plain text
        assertNotEquals("Password should be hashed", "password123", result.getPassword());

        // Verify that the repository save method was actually called
        verify(userRepository).save(any(User.class));
    }

    // Test updating an existing user
    @Test
    void updateUser_shouldUpdateExistingUser() {

        // Arrange - existing user already in the database
        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setFirstName("Old");
        existingUser.setLastName("Name");
        existingUser.setEmail("old@test.com");
        existingUser.setRole("USER");

        // New information we want to apply
        User updatedUser = new User();
        updatedUser.setFirstName("Richmond");
        updatedUser.setLastName("Asante");
        updatedUser.setEmail("richmond@test.com");
        updatedUser.setRole("ADMIN");

        // Pretend repository finds the existing user
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(existingUser));

        // When the existing user is saved, return it
        when(userRepository.save(existingUser))
                .thenReturn(existingUser);

        // Act
        User result = userService.updateUser(1L, updatedUser);

        // Assert
        assertEquals("First name should be updated", "Richmond", result.getFirstName());
        assertEquals("Email should be updated", "richmond@test.com", result.getEmail());
        assertEquals("Role should be updated", "ADMIN", result.getRole());

        // Verify the existing user was saved
        verify(userRepository).save(existingUser);
    }

    // Test updating a user that does not exist
    @Test
    void updateUser_shouldReturnNull_whenUserDoesNotExist() {

        // Arrange
        User updatedUser = new User();
        updatedUser.setFirstName("Richmond");
        updatedUser.setLastName("Asante");
        updatedUser.setEmail("richmond@test.com");
        updatedUser.setRole("ADMIN");

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        // Act
        User result = userService.updateUser(99L, updatedUser);

        // Assert
        assertNull(result, "User should not be updated if user does not exist");
    }

    // Test login when user does not exist
    @Test
    void loginUser_shouldReturnUserNotFound_whenEmailDoesNotExist() {

        // Arrange
        when(userRepository.findByEmail("missing@test.com"))
                .thenReturn(Optional.empty());

        // Act
        LoginResponse result =
                userService.loginUser("missing@test.com", "password312");

        // Assert
        assertEquals(
                "Login message should indicate user was not found",
                "User not found!",
                result.getMessage()
        );
    }

    // Test successful user login
    @Test
    void loginUser_shouldReturnSuccessfulLogin_whenCredentialsAreCorrect() {

        // Arrange
        User user = new User();
        user.setEmail("richmond@test.com");
        user.setRole("USER");
        user.setPassword(new BCryptPasswordEncoder().encode("correctPassword"));

        when(userRepository.findByEmail("richmond@test.com"))
                .thenReturn(Optional.of(user));

        // Mock JWT generation
        when(jwtService.generateToken("richmond@test.com", "USER"))
                .thenReturn("fake-jwt-token");

        // Act
        LoginResponse result =
                userService.loginUser("richmond@test.com", "correctPassword");

        // Assert
        assertEquals("Login should be successful",
                "Login Successful",
                result.getMessage());

        assertEquals("Email should match",
                "richmond@test.com",
                result.getEmail());

        assertEquals("Role should match",
                "USER",
                result.getRole());

        assertEquals("Token should match",
                "fake-jwt-token",
                result.getToken());
    }
}
