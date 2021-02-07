package tekup.de.storebook.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tekup.de.storebook.message.request.ProductForm;
import tekup.de.storebook.model.Category;
import tekup.de.storebook.model.Product;
import tekup.de.storebook.repository.CategoryRepository;
import tekup.de.storebook.repository.ProductRepository;
import tekup.de.storebook.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired 
	private ProductRepository prodRepos;
	@Autowired 
	private CategoryRepository catRepos;
	@Override
	public Product findOne(long id) {
		return prodRepos.getOne(id);
	}
	public List<Product> getProductsByCat(long id){
		
		List <Product> list=prodRepos.findAll();
		List <Product> list2= list.stream().filter(p->(p.getCategory().getId())==id).collect(Collectors.toList());
		
		
		return list2;
	}
	 public List<Product> getProducts(){
		 return prodRepos.findAll();
	 }
	@Override
	public Product save(Product product) {
		Category c=product.getCategory();
		List <Product >prod=c.getProducts();
		if(prod.size()==0)
			prod=new ArrayList();
		prod.add(product);
		c.setProducts(prod);
		catRepos.save(c);
		prodRepos.save(product);
		return product;
	}
	/*
	@Override
	public Product newP(ProductForm p) {
		long cat=product.getCategory();
		Optional <Category> c=catRepos.findById(cat);
		
		Product pp=new Product();
		pp.setAvaibility(p.getAvaibility());
		pp.setProductName(p.getProductName());
		pp.setProductPrice(p.getProductPrice());
		pp.setStock(p.getStock());
		pp.setUrl(p.getUrl());
		if(c.isPresent()) {
			Category ct;
			List <Product >prod=ct.getProducts();
			if(prod.size()==0)
				prod=new ArrayList();
			prod.add(pp);
			ct.setProducts(prod);
			catRepos.save(ct);
			pp.setCategory(ct);
			prodRepos.save(pp);
		}
		return pp;
	}
*/
	@Override
	public void delete(long id) {
		Product p=prodRepos.getOne(id);
		Category c=catRepos.getOne(p.getCategory().getId());
		List<Product> l=c.getProducts().stream()
		.filter(pp->pp.getProductId()==id)
		.map(m->m=null)
		.collect(Collectors.toList());
		c.setProducts(l);
		catRepos.save(c);
		prodRepos.deleteById(id);
		
	}
	@Override
	public Product updateProduct(Product p) {
	  Product old=prodRepos.getOne(p.getProductId());
	  if(p.getProductName()!=null) {
		  old.setProductName(p.getProductName());
		  
	  }
	  if(p.getProductPrice()!=null) {
		  old.setProductPrice(p.getProductPrice());
	  }
	  if(p.getUrl()!=null) {
		  old.setUrl(p.getUrl());
		  
	  }
	  prodRepos.save(old);
	  return old;
	}

	
}
