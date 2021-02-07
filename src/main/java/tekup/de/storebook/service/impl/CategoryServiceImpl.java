package tekup.de.storebook.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tekup.de.storebook.model.Category;
import tekup.de.storebook.repository.CategoryRepository;
import tekup.de.storebook.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired 
	private CategoryRepository catRepos;
	public List<Category> getCategories(){
		return catRepos.findAll();
	}
	public void createCategory(Category c) {
		catRepos.save(c);
	}
	public Category deleteCategory(long id) {
		Category c1=catRepos.getOne(id);
		catRepos.deleteById(id);
		return c1;
	}
	

}
