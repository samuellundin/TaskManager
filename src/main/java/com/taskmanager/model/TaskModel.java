package com.taskmanager.model;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;

import java.time.Instant;
import java.time.LocalDateTime;

public class TaskModel {

    private Long taskId;
    private String title;
    private String description;
    private Instant startDate;
    private Instant endDate;
    private Category category;
    private User user;

    public TaskModel(Task task) {
        this.taskId = task.getTaskId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.startDate = task.getStartDate();
        this.endDate = task.getEndDate();
        this.category = task.getCategory();
        this.user = task.getUser();
    }

    public TaskModel(Long taskId, String title, String description, Instant startDate, Instant endDate, Category category, User user) {
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

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
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
