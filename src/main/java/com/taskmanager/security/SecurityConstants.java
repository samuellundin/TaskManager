package com.taskmanager.security;

class SecurityConstants {

    static final String SECRET = "SecretKeyToGenJWTs";
    static final long EXPIRATION_TIME = 864_000_000; // 10 days
    static final String TOKEN_PREFIX = "Bearer ";
    static final String HEADER_STRING = "Authorization";
    static final String REGISTER_URL = "/register";
    static final String LOGIN_URL = "/login";

}
