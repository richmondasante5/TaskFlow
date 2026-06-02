package com.example.TaskFlow.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    // custom JWT filter that checks tokens before requests reach controllers
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // constructor injection
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // main Spring Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http.csrf(AbstractHttpConfigurer::disable) //

                // define which endpoints are public or protected
                .authorizeHttpRequests(auth -> auth

                        // public endpoints
                        .requestMatchers("/users/login").permitAll()
                        .requestMatchers("/users").permitAll()

                        // every other endpoint requires valid JWT authentication
                        .anyRequest().authenticated()
                )

                // do not create server-side sessions because JWT is stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // run our JWT filter before Spring's default username/password filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // build and return the security configuration
                .build();
    }
}