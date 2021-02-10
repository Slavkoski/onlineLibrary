package com.online.library.onlinelibrary.util;

import com.online.library.onlinelibrary.model.Book;
import com.online.library.onlinelibrary.model.Priority;
import com.online.library.onlinelibrary.model.ApplicationUser;
import com.online.library.onlinelibrary.model.Role;
import com.online.library.onlinelibrary.model.SimpleUserModel;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;

public class Util {

    public static boolean isValidBookForUser(Book book, final Collection<? extends GrantedAuthority> authorities) {
        if (Priority.UNREGISTERED.equals(book.getPriority())
                || authorities.contains(Constants.GrantedAuthorityConstants.ADMIN)
                || authorities.contains(Constants.GrantedAuthorityConstants.PREMIUM)) {
            return true;
        } else if (authorities.contains(Constants.GrantedAuthorityConstants.REGISTERED)
                && Priority.REGISTERED.equals(book.getPriority())) {
            return true;
        }
        return false;
    }

    public static SimpleUserModel convertToSimpleModelUser(ApplicationUser applicationUser) {
        return applicationUser != null
                ? SimpleUserModel.builder()
                                 .id(applicationUser.getId())
                                 .email(applicationUser.getEmail())
                                 .firstName(applicationUser.getFirstName())
                                 .lastName(applicationUser.getLastName())
                                 .roles(applicationUser.getRoles()
                                                       .stream()
                                                       .map(Role::getName)
                                                       .collect(Collectors.toList()))
                                 .build()
                : null;
    }

    public static boolean hasRole(final SimpleUserModel simpleUserModel, final String role) {
        return simpleUserModel.getRoles().contains(role);
    }

    public static boolean isAdmin(final Collection<? extends GrantedAuthority> authorities){
        return authorities.contains(Constants.GrantedAuthorityConstants.ADMIN);
    }

    public static boolean isSameUser(final ApplicationUser currentUser, final Long userId) {
        return currentUser!=null && currentUser.getId()==userId;
    }

    public static String getLabelForPriority(final Book book) {
        switch (book.getPriority()){
            case UNREGISTERED:
                return "Free";
            case REGISTERED:
                return "Registered";
            case PREMIUM:
                return "Premium";
            default:
                return "";
        }
    }
}
