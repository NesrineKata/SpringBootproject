package tekup.de.storebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tekup.de.storebook.model.Category;
import tekup.de.storebook.model.User;
import tekup.de.storebook.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "categories")
public class CategoryController {
	@Autowired
	private CategoryService catService;
	@GetMapping("/get")
	public List<Category> getCategories() {
		return catService.getCategories();
	}
	@PostMapping("/add")
	public void createCategory(@RequestBody Category c) {
		catService.createCategory(c);
	}
	@DeleteMapping(path = { "/{id}" })
	public Category deleteCategory(@PathVariable("id") int id) {
		return catService.deleteCategory(id);
	}
	

}
