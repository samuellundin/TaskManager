package com.taskmanager.repository;

import com.taskmanager.entity.User;
import com.taskmanager.model.UserModel;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    UserModel findByOne(Long id);

}
