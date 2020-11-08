package tekup.de.storebook.service;

import java.util.List;

import tekup.de.storebook.model.Category;
import tekup.de.storebook.model.User;

public interface CategoryService {
	public List<Category> getCategories(); 
	public void createCategory(Category c);
	public Category deleteCategory(int id);
	
}
