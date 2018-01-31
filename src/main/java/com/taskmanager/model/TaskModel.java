package com.taskmanager.model;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;

import java.time.LocalDateTime;

public class TaskModel {

    private Long taskId;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Category category;
    private User user;

    public TaskModel(Task task, Category category, User user) {
        this.taskId = task.getTaskId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.startDate = task.getStartDate();
        this.endDate = task.getEndDate();
        this.category = category;
        this.user = user;
    }

    public TaskModel(Long taskId, String title, String description, LocalDateTime startDate, LocalDateTime endDate, Category category, User user) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
        this.user = user;
    }

    public TaskModel() {}

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
