package tekup.de.storebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tekup.de.storebook.model.User;

public interface UserRepository  extends JpaRepository<User, Long>{

}
