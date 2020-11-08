package tekup.de.storebook.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import tekup.de.storebook.model.Category;
import tekup.de.storebook.model.Product;
import tekup.de.storebook.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "products")
public class ProductController {
	private byte[] bytes;
	@Autowired
	private ProductService prodService;
	@PostMapping("/upload")
	public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		this.bytes = file.getBytes();
	}
	@GetMapping("/get")
	public List<Product> getProducts() {
		return prodService.getProducts();
	}
	@GetMapping("/getprodbycat/{id}")
	public List<Product> getProductsByCat(@PathVariable("id") int id) {
		return prodService.getProductsByCat(id);
	}
	@GetMapping("/getproduct/{id}")
	public Product findOne(@PathVariable("id") int id) {
		return prodService.findOne(id);
	}
	@PostMapping("/add")
	public void createProduct(@RequestBody Product p) {
		//p.setPicByte(this.bytes);
		prodService.save(p);
		this.bytes = null;
	}
	@DeleteMapping(path = { "/{id}" })
	public void deleteProduct(@PathVariable("id") int id) {
		prodService.delete(id);
	}
	
}
