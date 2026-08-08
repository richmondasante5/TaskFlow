package com.example.TaskFlow.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    // Custom JWT filter that checks tokens before requests reach controllers
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Constructor injection
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Main Spring Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                // Enable CORS so React frontend can call Spring Boot backend
                .cors(Customizer.withDefaults())

                // Disable CSRF because this is a stateless REST API using JWT
                .csrf(AbstractHttpConfigurer::disable)

                // Define which endpoints are public or protected
                .authorizeHttpRequests(auth -> auth

                        // Public endpoints - no token required
                        .requestMatchers(HttpMethod.POST, "/users/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users").permitAll()

                        // Admin-only user management endpoints
                        .requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")

                        // Task endpoints allowed by role
                        .requestMatchers(HttpMethod.GET, "/tasks", "/tasks/**")
                        .hasAnyRole("ADMIN", "MANAGER", "DEVELOPER", "USER")

                        .requestMatchers(HttpMethod.POST, "/tasks", "/tasks/**")
                        .hasAnyRole("ADMIN", "MANAGER", "DEVELOPER")

                        .requestMatchers(HttpMethod.PUT, "/tasks", "/tasks/**")
                        .hasAnyRole("ADMIN", "MANAGER", "DEVELOPER")

                        .requestMatchers(HttpMethod.DELETE, "/tasks", "/tasks/**")
                        .hasAnyRole("ADMIN", "MANAGER")

                        // Every other endpoint requires valid JWT authentication
                        .anyRequest().authenticated()// The reason why azure could not open the api
                )

                // Do not create server-side sessions because JWT is stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Run our JWT filter before Spring's default username/password filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // Build and return the security configuration
                .build();
    }

    // CORS configuration for React frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Allow React dev server ports
        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175",
                "https://delightful-smoke-0ac2d0f0f.7.azurestaticapps.net"
        ));

        // Allow common HTTP methods
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        // Allow all headers, including Authorization and Content-Type
        configuration.setAllowedHeaders(List.of("*"));

        // Allow credentials if needed later
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Apply CORS settings to all backend endpoints
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}