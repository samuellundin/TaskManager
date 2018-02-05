package com.taskmanager.controller;

import com.taskmanager.entity.User;
import com.taskmanager.model.CategoryModel;
import com.taskmanager.service.CategoryService;
import com.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<CategoryModel>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    private ResponseEntity<List<CategoryModel>> getCategoriesByUserId(@PathVariable("userId") Long userId) {
        User user = userService.getUserByUserId(userId);
        return new ResponseEntity<>(categoryService.getCategoriesByUseId(user), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    private ResponseEntity<CategoryModel> registerCategory(@RequestBody CategoryModel categoryModel) {
        return new ResponseEntity<>(categoryService.registerCategory(categoryModel), HttpStatus.OK);
    }

    /*@RequestMapping("/delete/{categoryId}")
    private ResponseEntity deleteCategory(@PathVariable(value="categoryId") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity(HttpStatus.OK);
    }*/

}
