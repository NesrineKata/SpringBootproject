package tekup.de.storebook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tekup.de.storebook.model.Product;
import tekup.de.storebook.repository.ProductRepository;
import tekup.de.storebook.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired 
	private ProductRepository prodRepos;
	@Override
	public Product findOne(int id) {
		return prodRepos.getOne(id);
	}
	public List<Product> getProductsByCat(int id){
		List <Product> list=prodRepos.findAll();
		return list.stream().filter(p->p.getIdCategory()==id).collect(Collectors.toList());
		
	}
	 public List<Product> getProducts(){
		 return prodRepos.findAll();
	 }
	@Override
	public Product save(Product product) {
		prodRepos.save(product);
		return product;
	}

	@Override
	public void delete(int id) {
		prodRepos.deleteById(id);
		
	}

	
}
