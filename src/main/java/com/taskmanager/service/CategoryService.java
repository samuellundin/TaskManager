package com.taskmanager.service;

import com.taskmanager.entity.Category;
import com.taskmanager.entity.User;
import com.taskmanager.model.CategoryModel;
import com.taskmanager.model.TaskModel;
import com.taskmanager.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TaskService taskService;

    public List<CategoryModel> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryModel> categoryModels = new ArrayList<>();
        for(Category category: categories) {
            categoryModels.add(new CategoryModel(category, category.getUser()));
        }
        return categoryModels;
    }

    public List<CategoryModel> getCategoriesByUseId(User user) {
        List<Category> categories = categoryRepository.findAllByUser(user);
        List<CategoryModel> categoryModels = new ArrayList<>();
        for (Category category : categories) {
            categoryModels.add(new CategoryModel(category, category.getUser()));
        }
        return categoryModels;
    }

    public CategoryModel registerCategory(CategoryModel categoryModel) {
        Category category = new Category(categoryModel.getTitle(), categoryModel.getUser());
        return new CategoryModel(categoryRepository.saveAndFlush(category));
    }

    public void deleteCategory(Long categoryId) {
        try {
            categoryRepository.delete(categoryId);
            System.out.println("--- DELETED CATEGORY " + categoryId + " SUCCESSFULLY ---");
        }

        /* If category is already connected to tasks, these tasks will have their category changed to
           a fallback 'standard' category and then chosen category will be deleted once its freed */
        catch(org.springframework.dao.DataIntegrityViolationException e) {
            System.out.println("--- COULD NOT DELETE BECAUSE CATEGORY IS CONNECTED TO A TASK ---");

            List<TaskModel> tasks = taskService.getAllTasks();

            for(TaskModel task: tasks) {
                if(task.getCategory().getCategoryId().equals(categoryId)) {
                    System.out.println("--- CATEGORY EXISTS IN TASK: " + task.getTitle() + " ---");
                    Category fallbackCategory = null;
                    List<Category> fallbackCategories = categoryRepository.findAll();
                    for(Category cat : fallbackCategories) {
                        if (cat.getTitle().equals("Standard")) {
                            fallbackCategory = cat;
                        }
                    }
                    task.setCategory(fallbackCategory);
                    System.out.println("--- NEW CATEGORY FOR THESE TASKS: " + fallbackCategory.getTitle() + "(id:" + fallbackCategory.getCategoryId() + ") ---");
                    taskService.updateTask(task);
                }
            }
            deleteCategory(categoryId);
        }
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findOne(categoryId);
    }
}
