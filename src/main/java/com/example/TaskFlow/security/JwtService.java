package com.example.TaskFlow.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // secret key used to sign and verify JWT tokens
    private static final String SECRET_KEY = "mySuperSecretKeyForTaskFlowJwtAuthentication123456789";

    // method for generating JWT token
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSigningKey())
                .compact();
    }

    // method for generating signing key from secret key
    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    //extracting user email from JWT token
    public String extractEmail(String token) {

        //reading token and returning subject(email)
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    //checking if JWT token is valid for the user
    public boolean isTokenValid(String token, String userEmail) {

        //extracting email stored inside token
        String tokenEmail = extractEmail(token);

        //checking if token email matches user email and token has not expired
        return tokenEmail.equals(userEmail) && !isTokenExpired(token);
    }

    //checking if JWT token has expired
    private boolean isTokenExpired(String token) {

        //extracting expiration date from token and checking if it is before current time
        return extractExpiration(token).before(new Date());
    }

    //extracting expiration date from JWT token
    private Date extractExpiration(String token) {

        //reading token payload and returning expiration date
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }
}