package com.taskmanager.controller;

import com.taskmanager.model.CategoryModel;
import com.taskmanager.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(method = RequestMethod.GET)
    private ResponseEntity<List<CategoryModel>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    private ResponseEntity<CategoryModel> registerCategory(@RequestBody CategoryModel categoryModel) {
        return new ResponseEntity<>(categoryService.registerCategory(categoryModel), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{categoryId}", method = RequestMethod.DELETE)
    private ResponseEntity deleteCategory(@PathVariable("categoryId") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
