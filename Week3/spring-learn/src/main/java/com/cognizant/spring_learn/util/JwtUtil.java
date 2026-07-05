package com.cognizant.spring_learn.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET =
            "mysupersecretkeymysupersecretkey";

    public static String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 3600000))
                .signWith(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET.getBytes()),
                        SignatureAlgorithm.HS256)
                .compact();
    }
}
