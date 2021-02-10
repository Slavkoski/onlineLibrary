package com.online.library.onlinelibrary.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.CustomizedUserDetailsModel;
import com.online.library.onlinelibrary.model.Role;
import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.online.library.onlinelibrary.util.SecurityConstants.EXPIRATION_TIME;
import static com.online.library.onlinelibrary.util.SecurityConstants.HEADER_STRING;
import static com.online.library.onlinelibrary.util.SecurityConstants.SECRET;
import static com.online.library.onlinelibrary.util.SecurityConstants.TOKEN_PREFIX;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private final ApplicationUserRepository applicationUserRepository;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, final ApplicationUserRepository applicationUserRepository) {
        this.authenticationManager = authenticationManager;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            ApplicationUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), ApplicationUser.class);
            ApplicationUser applicationUser=applicationUserRepository.findByEmail(creds.getEmail());
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getEmail(),
                            creds.getPassword(),
                            applicationUser!=null ? getAuthorities(applicationUser.getRoles()) : new ArrayList<>()
                    )            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String token = JWT.create()
                          .withSubject(((CustomizedUserDetailsModel) auth.getPrincipal()).getUsername())
                          .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                          .sign(HMAC512(SECRET.getBytes()));
        JsonObject jwtResponseJson=new JsonObject();
        jwtResponseJson.addProperty(HEADER_STRING,TOKEN_PREFIX+token);
        res.getWriter().write(jwtResponseJson.toString());
    }


    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<Role> roles) {
        List<GrantedAuthority> authorities
                = new ArrayList<>();
        for (Role role: roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
            //            role.getPrivileges().stream()
            //                .map(p -> new SimpleGrantedAuthority(p.getName()))
            //                .forEach(authorities::add);
        }

        return authorities;
    }
}
