package tekup.de.storebook.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tekup.de.storebook.message.request.ProductForm;
import tekup.de.storebook.model.Category;
import tekup.de.storebook.model.Product;
import tekup.de.storebook.repository.CategoryRepository;
import tekup.de.storebook.service.ProductService;

@RestController
@RequestMapping(path = "/api/store/products")
public class ProductController {
	private byte[] bytes;
	@Autowired
	private ProductService prodService;
	@Autowired 
	private CategoryRepository repos;
	/*@PostMapping("/upload")
	public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		this.bytes = file.getBytes();
	}
	*/
	@GetMapping("/get")
	public List<Product> getProducts() {
		return prodService.getProducts();
	}
	@GetMapping("/getprodbycat/{id}")
	public List<Product> getProductsByCat(@PathVariable("id") long id) {
		return prodService.getProductsByCat(id);
	}
	@GetMapping("/getproduct/{id}")
	public Product findOne(@PathVariable("id") long id) {
		return prodService.findOne(id);
	}
	@PostMapping("/add")
	public void createProduct(@RequestBody ProductForm p) {
		//p.setPicByte(this.bytes);
		//prodService.save(p);
		//prodService.newP(p);
		//this.bytes = null;
		Product pp=new Product ();
		pp.setAvaibility(p.getAvaibility());
		pp.setProductName(p.getProductName());
		pp.setStock(p.getStock());
		pp.setUrl(p.getUrl());
		pp.setProductPrice(p.getProductPrice());
		Category c=repos.getOne(p.getCategory());
		pp.setCategory(c);
		prodService.save(pp);
			
		System.out.println("Product "+p.getCategory() +"  "+ p.getProductName());
	}
	@DeleteMapping(path = { "/delete/{id}" })
	public void deleteProduct(@PathVariable("id") long id) {
		prodService.delete(id);
	}
	@PutMapping(path= {"/update"})
	public Product updateProduct(@RequestBody Product p) {
		Product old=prodService.updateProduct(p);
		return old;
	}
	
}
