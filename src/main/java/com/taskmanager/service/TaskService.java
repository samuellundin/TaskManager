package com.taskmanager.service;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.Task;
import com.taskmanager.model.TaskModel;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskModel> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskModel> taskModels = new ArrayList<>();
        for(Task task: tasks) {
            taskModels.add(new TaskModel(task));
        }
        return taskModels;
    }

    public TaskModel registerTask(TaskModel taskModel) {
        Task task = new Task(taskModel);
        return new TaskModel(taskRepository.saveAndFlush(task));
    }

   /*public List<TaskModel> getTasksByCategoryId(Category category) {
        List<Task> tasks = taskRepository.findAllByCategoryId(category);
        List<TaskModel> taskModels = new ArrayList<>();
        for (Task task : tasks) {
            taskModels.add(new TaskModel(task, task.getCategory()));
        }
        return taskModels;
    }*/
}
