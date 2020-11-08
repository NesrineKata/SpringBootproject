package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tekup.de.storebook.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

}
