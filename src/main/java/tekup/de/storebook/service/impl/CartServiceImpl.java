package tekup.de.storebook.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tekup.de.storebook.model.*;
import tekup.de.storebook.repository.*;

import tekup.de.storebook.service.*;
@Service
public class CartServiceImpl implements CartService {
    @Autowired
    ProductInOrderRepository productOrderRepo;
    @Autowired
    private ProductService productService;

    @Autowired
    UserRepository userRepository;


    @Autowired
    CartRepository cartRepository;
 

    @Override
    public List<ProductInOrder> getCart(User user) {
    	List<ProductInOrder>l;
    	 if(user.getCart()!=null)
    		 l=user.getCart().getProducts();
    	 else
    		 l=new ArrayList();
    	 return l;
    }
    @Override
    public void addProduct(Product p,User u,int qnt) {
    	Optional<Cart> c=cartRepository.findByUser(u);
    	Cart cart;
		ProductInOrder po = null;
    	if(c.isPresent()) {
    		cart=c.get();
    		List<ProductInOrder> l=cart.getProducts();
    		int test=0;
    		for(ProductInOrder p1:l) {
    			if(p1.getProduct().getProductId()==p.getProductId()) {
    				p1.setQnt(p1.getQnt()+qnt);
    				//p1.setCart(cart);
    				//cart.setProducts(l);
    	    		//cartRepository.save(cart);
    	    		productOrderRepo.save(p1);
    				return;
    			}
    		}
    		if(test==0) {
    			po=new ProductInOrder();
    			po.setCart(cart);
    			po.setQnt(qnt);
    			l.add(po);
    		}
    		cart.setProducts(l);
    		cartRepository.save(cart);	
    		
    	}else {
    		Cart ct=new Cart(u);
    	    po =new ProductInOrder();
    	    po.setQnt(qnt);
        	List<ProductInOrder>l=new ArrayList();
        	po.setCart(ct);
        	l.add(po);
        	ct.setProducts(l);
        	cartRepository.save(ct);
    		
    	}
    	List<ProductInOrder> l1;
    	if(p.getOrders().size()>0)
    		 l1=p.getOrders();
    	else 
    		l1=new ArrayList();
    	l1.add(po);
    	p.setOrders(l1);
    	productService.save(p);
    	po.setProduct(p);
    	productOrderRepo.save(po);
    	System.out.println("heelo");
    	
    	
    }
    
/*
    @Override
    @Transactional
    public void mergeLocalCart(Collection<ProductInOrder> productInOrders, User user) {
        Cart finalCart = user.getCart();
        productInOrders.forEach(productInOrder -> {
            Set<ProductInOrder> set = finalCart.getProducts();
            Optional<ProductInOrder> old = set.stream().filter(e -> e.getProductId().equals(productInOrder.getProductId())).findFirst();
            ProductInOrder prod;
            if (old.isPresent()) {
                prod = old.get();
                prod.setCount(productInOrder.getCount() + prod.getCount());
            } else {
                prod = productInOrder;
                prod.setCart(finalCart);
                finalCart.getProducts().add(prod);
            }
            productInOrderRepository.save(prod);
        });
        cartRepository.save(finalCart);

    }
*/
    @Override
    @Transactional
    public void delete(long itemId, User user) {
    	productOrderRepo.deleteById(itemId);
        /*for(int i=0;i<l.size();i++) {
     	   ProductInOrder pr=l.get(i);
     	  List<ProductInOrder>l2=pr.getProduct().getOrders().stream()
     	  .filter(m->m.getProductioId()==itemId)
     	  .map(m->m=null)
     	  .collect(Collectors.toList());
     	  pr.getProduct().setOrders(l2);   
     	  productService.save(pr.getProduct());
        }
        
        
         user.getCart().setProducts(null);
         
         userService.save(user);
         orderRepo.save(o);
         */
    }


/*
    @Override
    @Transactional
    public void checkout(User user) {
        // Creat an order
        OrderMain order = new OrderMain(user);
        orderRepository.save(order);

        // clear cart's foreign key & set order's foreign key& decrease stock
        user.getCart().getProducts().forEach(productInOrder -> {
            productInOrder.setCart(null);
            productInOrder.setOrderMain(order);
            //productService.decreaseStock(productInOrder.getProductId(), productInOrder.getCount());
            productInOrderRepository.save(productInOrder);
        });

    }
    */
}