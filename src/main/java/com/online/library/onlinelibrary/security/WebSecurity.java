package com.online.library.onlinelibrary.security;

import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import com.online.library.onlinelibrary.service.impl.UserDetailsServiceImpl;
import com.online.library.onlinelibrary.util.Constants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.online.library.onlinelibrary.util.SecurityConstants.SIGN_UP_URL;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private final ApplicationUserRepository applicationUserRepository;

    public WebSecurity(final ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.cors()
//            .and()
//            .authorizeRequests()
//            .antMatchers("/user/**", "/genre", "/genre/**", "/actor", "/actor/**", "/movie", "/movie/**", "/books/image/**", "/actor/**")
//            .permitAll()
//            .and().csrf().disable().authorizeRequests()
//            .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
//            .anyRequest().authenticated()
//            .and()
//            .addFilter(new JWTAuthorizationFilter(authenticationManager()))
//            .addFilter(new JWTAuthenticationFilter(authenticationManager()))
//            // this disables session creation on Spring Security
//            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors().and().csrf().disable().authorizeRequests()
            .antMatchers(HttpMethod.POST,"/publisher/save").hasAuthority(Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST,"/users/changePassword").hasAnyAuthority(Constants.Roles.REGISTERED_USER,Constants.Roles.PREMIUM_USER,Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST, SIGN_UP_URL, "/books/image/**", "/comment/**").permitAll()
            .antMatchers(HttpMethod.GET, "/users/details/**","/books/**","/genre/**","/publisher/**","/authors/**", "/comment/**","/search/**").permitAll()
            //            .antMatchers(HttpMethod.GET, "/").hasAnyRole("UNREGISTERED_USER", "REGISTERED_USER", "PREMIUM_USER", "ADMIN_USER")
            .antMatchers(HttpMethod.POST,"/authors/add").hasAuthority(Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST,"/users/edit").hasAnyAuthority(Constants.Roles.REGISTERED_USER,Constants.Roles.PREMIUM_USER,Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST,"/users/upgradeToPremium").hasAnyAuthority(Constants.Roles.REGISTERED_USER,Constants.Roles.PREMIUM_USER,Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST,"/users/removePremium").hasAnyAuthority(Constants.Roles.REGISTERED_USER,Constants.Roles.PREMIUM_USER,Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.GET,"/**").hasAuthority(Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.POST, "/**").hasAuthority(Constants.Roles.ADMIN_USER)
            .antMatchers(HttpMethod.DELETE,"/**").hasAuthority(Constants.Roles.ADMIN_USER)
            .anyRequest().authenticated()
//            .authorizeRequests()
//            .antMatchers("/user/**", "/genre", "/genre/**", "/actor", "/actor/**", "/movie", "/movie/**", "/books/image/**", "/actor/**")
//            .permitAll()
//            .and()
            .and()
            .addFilter(new JWTAuthenticationFilter(authenticationManager(), applicationUserRepository))
            .addFilter(new JWTAuthorizationFilter(authenticationManager(), applicationUserRepository))
            // this disables session creation on Spring Security
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }

//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
//    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl(applicationUserRepository);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
