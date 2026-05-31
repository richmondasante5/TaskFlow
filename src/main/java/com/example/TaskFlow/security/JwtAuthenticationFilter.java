package com.example.TaskFlow.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    // service used to extract and validate JWT tokens
    private final JwtService jwtService;

    // constructor injection
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //getting Authorization header from incoming request
        final String authHeader = request.getHeader("Authorization");

        //checking if Authorization header is missing or invalid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            //continue request without JWT authentication
            filterChain.doFilter(request, response);
            return;
        }
        //extracting JWT token by removing "Bearer " prefix
        String jwtToken = authHeader.substring(7);

        //extracting user email from JWT token
        String userEmail = jwtService.extractEmail(jwtToken);

        //continue request after extracting token information
        filterChain.doFilter(request, response);

    }

}
