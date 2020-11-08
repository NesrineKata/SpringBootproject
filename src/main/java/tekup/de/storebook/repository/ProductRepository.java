package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tekup.de.storebook.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
