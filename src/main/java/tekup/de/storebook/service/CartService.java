package tekup.de.storebook.service;

import java.util.Collection;
import java.util.List;

import tekup.de.storebook.model.*;

public interface CartService {
	List<ProductInOrder>getCart(User user);
    void addProduct(Product p,User u ,int qnt);

    //void mergeLocalCart(Collection<ProductInOrder> productInOrders, User user);

    void delete(long itemId, User user);

    //void checkout(User user);
}