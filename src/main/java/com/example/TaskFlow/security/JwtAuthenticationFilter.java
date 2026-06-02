package com.example.TaskFlow.security;

import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // service used to extract and validate JWT tokens
    private final JwtService jwtService;

    // repository used to find user from database
    private final UserRepository userRepository;

    // constructor injection
    public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // getting Authorization header from incoming request
        final String authHeader = request.getHeader("Authorization");

        // checking if Authorization header is missing or invalid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            // continue request without JWT authentication
            filterChain.doFilter(request, response);
            return;
        }

        // extracting JWT token by removing "Bearer " prefix
        String jwtToken = authHeader.substring(7);

        // extracting user email from JWT token
        String userEmail = jwtService.extractEmail(jwtToken);

        // finding user from database using email extracted from token
        User user = userRepository.findByEmail(userEmail).orElse(null);

        // checking if user exists and token is valid
        if (user != null && jwtService.isTokenValid(jwtToken, user.getEmail())) {

            // creating authentication object for Spring Security
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            Collections.emptyList()
                    );
            // storing authenticated user in Spring Security context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // continue request after JWT processing
        filterChain.doFilter(request, response);
    }
}