package tekup.de.storebook.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tekup.de.storebook.message.request.ProductForm;
import tekup.de.storebook.message.response.CategoryDto;
import tekup.de.storebook.model.*;
import tekup.de.storebook.repository.*;
import tekup.de.storebook.service.CategoryService;

@RestController
@RequestMapping(path = "/api/store/categories")
public class CategoryController {
	@Autowired
	private CategoryService catService;
	@Autowired
	private CategoryRepository repos;
	@Autowired 
	private ProductRepository reposProd;
	@GetMapping("/get")
	public List<Category> getCategories() {
		return catService.getCategories();
	}
	@GetMapping(path = { "/{id}" })
	public CategoryDto getCategory(@PathVariable("id") long id) {
		Category c=repos.getOne(id);
		CategoryDto ca=new CategoryDto();
		ca.setId(c.getId());
		ca.setLibelle(c.getLibelle());
		return ca;
	}
	@GetMapping(path="/search/{str}")
	public List<Product> searchProduct(@PathVariable("str") String car){	
		System.out.print(car);
		return reposProd.findAll().stream()
			  .filter(m -> m.getProductName().toUpperCase().contains(car.toUpperCase()))
			  .collect(Collectors.toList());
	}	
	@PostMapping("/add")
	public void createCategory(@RequestBody Category c) {
		catService.createCategory(c);
	}
	@DeleteMapping(path = { "/{id}" })
	public Category deleteCategory(@PathVariable("id") long id) {
		return catService.deleteCategory(id);
	}
	
}

