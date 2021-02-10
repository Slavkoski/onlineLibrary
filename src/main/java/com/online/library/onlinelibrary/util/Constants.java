package com.online.library.onlinelibrary.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class Constants {
    public static class GrantedAuthorityConstants {

        public static final GrantedAuthority ADMIN=new SimpleGrantedAuthority(Roles.ADMIN_USER);
        public static final GrantedAuthority UNREGISTERED=new SimpleGrantedAuthority(Roles.UNREGISTERED_USER);
        public static final GrantedAuthority REGISTERED=new SimpleGrantedAuthority(Roles.REGISTERED_USER);
        public static final GrantedAuthority PREMIUM=new SimpleGrantedAuthority(Roles.PREMIUM_USER);

    }

    public static class Roles{
        public static final String ADMIN_USER="ADMIN";
        public static final String UNREGISTERED_USER="UNREGISTERED_USER";
        public static final String REGISTERED_USER="REGISTERED_USER";
        public static final String PREMIUM_USER="PREMIUM_USER";

        private Roles(){
            throw new UnsupportedOperationException();
        }
    }

    public static class Paths{
        public static final String SIGN_UP="/sign-up";
    }
}
