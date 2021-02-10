package com.online.library.onlinelibrary.service;

import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.SimpleUserModel;

import java.util.List;

public interface UserManagementService {

    List<SimpleUserModel> getAllUsers();
    List<SimpleUserModel> getUsersByRole(String role);
    SimpleUserModel getUserById(Long userId);
    void updateUser(final Long id, final String firstName, final String lastName, final String email, final String roleName);
    boolean deleteUser(Long userId);
    void deleteUser(ApplicationUser user);

    boolean changePassword(Long id, String oldPassword, String newPassword, String repeatNewPassword);

    void signUp(String firstName, String lastName, String email, String password, String roleName);
}
