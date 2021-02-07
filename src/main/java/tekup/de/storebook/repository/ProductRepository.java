package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tekup.de.storebook.model.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Product findByProductId(Long productId);
}
