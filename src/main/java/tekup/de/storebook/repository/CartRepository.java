package tekup.de.storebook.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import tekup.de.storebook.model.Cart;
import tekup.de.storebook.model.User;


public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional <Cart> findByUser(User u);
}