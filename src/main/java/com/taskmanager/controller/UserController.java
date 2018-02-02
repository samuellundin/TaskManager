package com.taskmanager.controller;

import com.taskmanager.model.UserModel;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<UserModel>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<UserModel> getUser(UserModel userModel, Long id){
        return new ResponseEntity<>(userService.getUser(userModel, id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    private ResponseEntity<UserModel> registerUser(@RequestBody UserModel userModel) {
        return new ResponseEntity<>(userService.registerUser(userModel), HttpStatus.OK);
    }

}
