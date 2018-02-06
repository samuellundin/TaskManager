package com.taskmanager.service;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.model.TaskModel;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public TaskService(TaskRepository taskRepository, CategoryService categoryService, UserService userService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
        this.userService = userService;
    }

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

    public Task updateTask(TaskModel taskModel) {
        Task task = taskRepository.findOne(taskModel.getTaskId());

        task.setCategory(taskModel.getCategory());
        return taskRepository.save(task);
    }

   public List<TaskModel> getTasksByCategoryId(Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        List<Task> tasks = taskRepository.findAllByCategory(category);
        List<TaskModel> taskModels = new ArrayList<>();
        for (Task task : tasks) {
            taskModels.add(new TaskModel(task));
        }
        return taskModels;
    }

    public List<TaskModel> getTasksByUserId(Long userId) {
        User user = userService.getUserByUserId(userId);
        List<TaskModel> taskModels = new ArrayList<>();
        for(Task task: taskRepository.findAllByUser(user)) {
            taskModels.add(new TaskModel(task));
        }
        return taskModels;
    }

    public void deleteTask(Long taskId) {
        taskRepository.delete(taskId);
    }
}
