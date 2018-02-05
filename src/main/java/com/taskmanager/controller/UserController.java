package com.taskmanager.controller;

import com.taskmanager.model.UserModel;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<UserModel>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public ResponseEntity<UserModel> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    private ResponseEntity<UserModel> login(@RequestBody UserModel userModel) throws Exception {
        UserModel user = userService.getUserByUsername(userModel.getUsername());
        if(bCryptPasswordEncoder.matches(userModel.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            throw new Exception();
        }
    }

}
