package com.taskmanager.repository;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    //List<Task> findAllByCategoryId(Category category);

}
