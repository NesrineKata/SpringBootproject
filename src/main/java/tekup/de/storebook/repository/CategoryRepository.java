package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tekup.de.storebook.model.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

}
