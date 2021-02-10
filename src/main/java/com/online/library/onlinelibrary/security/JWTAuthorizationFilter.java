package com.online.library.onlinelibrary.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.Role;
import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static com.online.library.onlinelibrary.util.SecurityConstants.HEADER_STRING;
import static com.online.library.onlinelibrary.util.SecurityConstants.SECRET;
import static com.online.library.onlinelibrary.util.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    private final ApplicationUserRepository applicationUserRepository;

    public JWTAuthorizationFilter(AuthenticationManager authManager, final ApplicationUserRepository applicationUserRepository) {
        super(authManager);
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                             .build()
                             .verify(token.replace(TOKEN_PREFIX, ""))
                             .getSubject();

            if (user != null) {
                ApplicationUser applicationUser=applicationUserRepository.findByEmail(user);
                Collection<Role> roles=applicationUser !=null ? applicationUser.getRoles() : new ArrayList<>();
                return new UsernamePasswordAuthenticationToken(user, null,getAuthorities(roles));
            }
        }
        return null;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<Role> roles) {
        List<GrantedAuthority> authorities
                = new ArrayList<>();
        for (Role role: roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        return authorities;
    }
}
