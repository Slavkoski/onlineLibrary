package com.online.library.onlinelibrary.service.impl;

import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.Role;
import com.online.library.onlinelibrary.model.SimpleUserModel;
import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import com.online.library.onlinelibrary.repository.RoleRepository;
import com.online.library.onlinelibrary.service.UserManagementService;
import com.online.library.onlinelibrary.util.Util;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserManagementServiceImpl implements UserManagementService {

    private final ApplicationUserRepository applicationUserRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserManagementServiceImpl(final ApplicationUserRepository applicationUserRepository, final RoleRepository roleRepository, final BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<SimpleUserModel> getAllUsers() {
        return applicationUserRepository.findAll()
                                        .stream()
                                        .map(Util::convertToSimpleModelUser)
                                        .collect(Collectors.toList());
    }

    @Override
    public List<SimpleUserModel> getUsersByRole(String role) {

        return getAllUsers().stream()
                            .filter(simpleUserModel -> Util.hasRole(simpleUserModel, role))
                            .collect(Collectors.toList());
    }

    @Override
    public SimpleUserModel getUserById(final Long userId) {
        return applicationUserRepository
                .findById(userId)
                .map(Util::convertToSimpleModelUser)
                .orElse(null);
    }

    @Override
    public void updateUser(final Long id, final String firstName, final String lastName, final String email, final String roleName) {
        Optional<ApplicationUser> oldUser = applicationUserRepository.findById(id);
        if (oldUser.isPresent()) {
            Role role = roleRepository.findByName(roleName).orElse(Role.builder().name(roleName).build());
            roleRepository.save(role);
            ApplicationUser updatedUser = ApplicationUser.builder()
                                                         .id(oldUser.get().getId())
                                                         .firstName(firstName)
                                                         .lastName(lastName)
                                                         .email(email)
                                                         .password(oldUser.get().getPassword())
                                                         .roles(Collections.singletonList(role))
                                                         .build();
            applicationUserRepository.save(updatedUser);
        }
    }

    @Override
    public boolean deleteUser(final Long userId) {
        final Authentication authentication = SecurityContextHolder.getContext()
                                                                   .getAuthentication();

        if (Util.isAdmin(authentication.getAuthorities())) {
            final Optional<ApplicationUser> userToDelete = applicationUserRepository.findById(userId);
            if (userToDelete.isPresent()) {
                deleteUser(userToDelete.get());
                return true;
            }
        } else {
            final ApplicationUser currentUser = applicationUserRepository.findByEmail(authentication.getPrincipal()
                                                                                                    .toString());
            if (Util.isSameUser(currentUser, userId)) {
                deleteUser(currentUser);
                return true;
            }
        }
        return false;
    }

    @Override
    public void deleteUser(final ApplicationUser user) {
        applicationUserRepository.delete(user);
    }

    @Override
    public boolean changePassword(final Long id, final String oldPassword, final String newPassword, final String repeatNewPassword) {
        final Authentication authentication = SecurityContextHolder.getContext()
                                                                   .getAuthentication();
        final ApplicationUser user = applicationUserRepository.findById(id).orElse(null);
        if(user != null && (Util.isAdmin(authentication.getAuthorities()) || bCryptPasswordEncoder.matches(oldPassword,user.getPassword())) && newPassword.equals(repeatNewPassword)){
            applicationUserRepository.save(ApplicationUser
                    .builder()
                    .id(user.getId())
                    .roles(user.getRoles())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .password(bCryptPasswordEncoder.encode(newPassword))
                    .build());
            return true;
        }
        return false;
    }

    @Override
    public void signUp(final String firstName, final String lastName, final String email, final String password, final String roleName) {
        Role role = roleRepository.findByName(roleName).orElse(Role.builder().name(roleName).build());
        ApplicationUser user = ApplicationUser.builder()
                                              .firstName(firstName)
                                              .lastName(lastName)
                                              .email(email)
                                              .password(bCryptPasswordEncoder.encode(password))
                                              .roles(Collections.singletonList(role))
                                              .build();
        roleRepository.save(role);
        applicationUserRepository.save(user);
    }

}
