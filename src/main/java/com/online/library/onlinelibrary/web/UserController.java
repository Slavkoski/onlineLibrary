package com.online.library.onlinelibrary.web;

import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.Role;
import com.online.library.onlinelibrary.model.SimpleUserModel;
import com.online.library.onlinelibrary.repository.ApplicationUserRepository;
import com.online.library.onlinelibrary.repository.RoleRepository;
import com.online.library.onlinelibrary.service.UserManagementService;
import com.online.library.onlinelibrary.util.Constants;
import com.online.library.onlinelibrary.util.Util;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final ApplicationUserRepository applicationUserRepository;
    private final UserManagementService userManagementService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RoleRepository roleRepository;

    public UserController(ApplicationUserRepository applicationUserRepository,
                          final UserManagementService userManagementService, BCryptPasswordEncoder bCryptPasswordEncoder, final RoleRepository roleRepository) {
        this.applicationUserRepository = applicationUserRepository;
        this.userManagementService = userManagementService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestParam String firstName,
                       @RequestParam String lastName,
                       @RequestParam String email,
                       @RequestParam String password,
                       @RequestParam(defaultValue = Constants.Roles.REGISTERED_USER) String roleName) {
        userManagementService.signUp(firstName, lastName, email, password, roleName);
    }

    @GetMapping("/users/details")
    public SimpleUserModel getUserDetails() {
        final Authentication authentication = SecurityContextHolder.getContext()
                                                                   .getAuthentication();
        return Util.convertToSimpleModelUser(applicationUserRepository.findByEmail(authentication.getPrincipal()
                                                                                                 .toString()));
    }

    @GetMapping("/users/{role}")
    public List<SimpleUserModel> getUsersForRole(@PathVariable String role) {
        return userManagementService.getUsersByRole(role);
    }

    @GetMapping("/users/details/{userId}")
    public SimpleUserModel getUser(@PathVariable Long userId) {
        return userManagementService.getUserById(userId);
    }

    @PostMapping("/users/edit")
    public void updateUser(@RequestParam Long id,
                           @RequestParam String firstName,
                           @RequestParam String lastName,
                           @RequestParam String email,
                           @RequestParam String roleName) {
        userManagementService.updateUser(id, firstName, lastName, email, roleName);

    }

    @PostMapping("/users/delete")
    public void deleteUser(@RequestParam Long userId) {
        userManagementService.deleteUser(userId);
    }

    @PostMapping("/users/changePassword")
    public void changePassword(@RequestParam Long id,
                               @RequestParam(required = false) String oldPassword,
                               @RequestParam String newPassword,
                               @RequestParam String repeatNewPassword) {
        if (!userManagementService.changePassword(id, oldPassword, newPassword, repeatNewPassword)) {
            throw new UnsupportedOperationException();
        }
    }

    @PostMapping("/users/upgradeToPremium")
    public SimpleUserModel upgradeToPremium() {
        final String email = SecurityContextHolder.getContext()
                                                  .getAuthentication().getPrincipal().toString();
        final ApplicationUser user = applicationUserRepository.findByEmail(email);
        Optional<Role> role = roleRepository.findByName(Constants.Roles.PREMIUM_USER);
        if(role.isEmpty()){
            role=Optional.of(roleRepository.save(Role.builder().name(Constants.Roles.PREMIUM_USER).build()));
        }
        final ApplicationUser updatedUser = applicationUserRepository.save(ApplicationUser
                .builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .email(user.getEmail())
                .id(user.getId())
                .roles(Collections.singletonList(role.get()))
                .build());

        return Util.convertToSimpleModelUser(updatedUser);
    }

    @PostMapping("/users/removePremium")
    public SimpleUserModel removePremium() {
        final String email = SecurityContextHolder.getContext()
                                                  .getAuthentication().getPrincipal().toString();
        final ApplicationUser user = applicationUserRepository.findByEmail(email);
        Optional<Role> role = roleRepository.findByName(Constants.Roles.REGISTERED_USER);
        if(role.isEmpty()){
            role=Optional.of(roleRepository.save(Role.builder().name(Constants.Roles.REGISTERED_USER).build()));
        }
        final ApplicationUser updatedUser = applicationUserRepository.save(ApplicationUser
                .builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .email(user.getEmail())
                .id(user.getId())
                .roles(Collections.singletonList(role.get()))
                .build());

        return Util.convertToSimpleModelUser(updatedUser);
    }
}
