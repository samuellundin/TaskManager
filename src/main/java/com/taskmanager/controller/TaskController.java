package com.taskmanager.controller;

import com.taskmanager.entity.Category;
import com.taskmanager.model.TaskModel;
import com.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<TaskModel>> getAllTasks() {
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    private ResponseEntity<TaskModel> registerTask(@RequestBody TaskModel taskModel) {
        return new ResponseEntity<>(taskService.registerTask(taskModel), HttpStatus.OK);
    }

    /*@RequestMapping(value = "/{categoryId}", method = RequestMethod.GET)
    private ResponseEntity<List<TaskModel>> getTaskByCategoryId(@PathVariable("categoryId") Long categoryId) {
        Category category = taskService.getTasksByCategoryId(categoryId);
        return new ResponseEntity<>(taskService.getTasksByCategoryId(category), HttpStatus.OK);
    }*/
}
