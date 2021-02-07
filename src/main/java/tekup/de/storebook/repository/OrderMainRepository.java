package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tekup.de.storebook.model.OrderMain;
@Repository
public interface OrderMainRepository extends JpaRepository <OrderMain,Long> {
}
