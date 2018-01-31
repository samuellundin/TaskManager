package com.taskmanager.model;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.User;

public class CategoryModel {

    private Long categoryId;
    private String title;
    private User user;

    public CategoryModel(Category category, User user) {
        this.categoryId = category.getCategoryId();
        this.title = category.getTitle();
        this.user = user;
    }

    public CategoryModel(Long categoryId, String title, User user) {
        this.categoryId = categoryId;
        this.title = title;
        this.user = user;
    }

    public CategoryModel() {}

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
