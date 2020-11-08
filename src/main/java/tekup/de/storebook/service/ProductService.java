package tekup.de.storebook.service;

import java.util.List;

import tekup.de.storebook.model.Product;

public interface ProductService {
	    public Product findOne(int productId);
	   // public Product offSale(int productId);
	   // public Product onSale(int productId);
	   // public Product update(Product roductInfo);
	    public Product save(Product productInfo);
	    public void delete(int productId);
	    public List<Product> getProducts();
	    public List<Product> getProductsByCat(int id);
	    
}
