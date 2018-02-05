package com.taskmanager.service;

import com.taskmanager.entity.User;
import com.taskmanager.model.UserModel;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserModel> userModels = new ArrayList<>();
        for(User user: users) {
            userModels.add(new UserModel(user));
        }
        return userModels;
    }

    public UserModel getUser(UserModel userModel, Long id){

        userModel = new UserModel(userRepository.findOne(id));
        return userModel;

    }



    public UserModel registerUser(UserModel userModel) {
        User user = new User(userModel);
        return new UserModel(userRepository.saveAndFlush(user));
    }

}
