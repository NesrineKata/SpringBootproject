package tekup.de.storebook.service;

import java.util.List;

import tekup.de.storebook.message.request.ProductForm;
import tekup.de.storebook.model.Product;

public interface ProductService {
	    public Product findOne(long productId);
	   // public Product offSale(int productId);
	   // public Product onSale(int productId);
	   // public Product update(Product roductInfo);
	    public Product save(Product productInfo);
	   // public Product newP(ProductForm productInfo);
	    public void delete(long productId);
	    public List<Product> getProducts();
	    public List<Product> getProductsByCat(long id);
	    public Product updateProduct(Product p);
	    
}
