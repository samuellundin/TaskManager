package com.taskmanager.controller;

import com.taskmanager.entity.User;
import com.taskmanager.exception.DuplicateUserException;
import com.taskmanager.model.UserModel;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<UserModel>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{username}/", method = RequestMethod.GET)
    public ResponseEntity<UserModel> getUserByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<UserModel> updateUser(@RequestBody UserModel userModel) throws DuplicateUserException {
        User user = userService.updateUser(userModel);
        return new ResponseEntity<>(new UserModel(user), HttpStatus.OK);
    }

}
