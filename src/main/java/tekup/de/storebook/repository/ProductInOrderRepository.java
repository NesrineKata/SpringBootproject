package tekup.de.storebook.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import tekup.de.storebook.model.ProductInOrder;
public interface ProductInOrderRepository  extends JpaRepository<ProductInOrder,Long>{

}
