package com.taskmanager.service;

import com.taskmanager.entity.Category;
import com.taskmanager.model.CategoryModel;
import com.taskmanager.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryModel> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryModel> categoryModels = new ArrayList<>();
        for(Category category: categories) {
            categoryModels.add(new CategoryModel(category, category.getUser()));
        }
        return categoryModels;
    }

    public CategoryModel registerCategory(CategoryModel categoryModel) {
        Category category = new Category(categoryModel.getTitle(), categoryModel.getUser());
        return new CategoryModel(categoryRepository.saveAndFlush(category));
    }

    public void deleteCategory(Long categoryId) {
        System.out.println("delete in service");
        categoryRepository.delete(categoryId);
    }
}
