package tekup.de.storebook.controller;
import java.math.BigDecimal;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.model.Charge;

import tekup.de.storebook.message.request.ItemForm;
import tekup.de.storebook.model.*;
import tekup.de.storebook.repository.*;
import tekup.de.storebook.security.IAuthService;
import tekup.de.storebook.service.CartService;
import tekup.de.storebook.service.ProductService;
import tekup.de.storebook.service.StripeClient;

@RestController
@RequestMapping("/api/store/cart")
//@CrossOrigin
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    UserRepository userService;
    @Autowired
    ProductService productService;
    @Autowired
    IAuthService authService;
    @Autowired
    private StripeClient stripeClient;
    @Autowired
    private OrderMainRepository orderRepo;
    @Autowired
    private ProductInOrderRepository prodRepo;

/*
    public ResponseEntity<Cart> mergeCart(@RequestBody Collection<ProductInOrder> productInOrders, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        try {
            cartService.mergeLocalCart(productInOrders, user);
            System.out.println(user.getName());
        } catch (Exception e) {
            ResponseEntity.badRequest().body("Merge Cart Failed");
            System.out.println(user.getName()+"error");

        }
        
        return ResponseEntity.ok(cartService.getCart(user));
    }
*/
    @GetMapping("/getall")
    public List<ProductInOrder> getCart(){//Principal principal) {
    	//try {
    	String username=authService.getUsername();
    	User user = userService.findByUsername(username).orElseThrow(
    		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
    	// User user = userService.findByUsername(principal.getName()).orElseThrow(
 		//		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
         System.out.println("My name is "+user.getUsername());
        return cartService.getCart(user);
    	//}catch(Exception e) {
        //return new ArrayList<ProductInOrder>();
    	//}
    	
    }

    //, Principal principal
    @PostMapping("/add")
    public boolean addToCart(@RequestBody ItemForm form){//,Principal principal) {
        String username=authService.getUsername();
    	Product p = productService.findOne(form.getProductId());
    	User user = userService.findByUsername(username).orElseThrow(
    			() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
    	/*User user = userService.findByUsername(principal.getName()).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        */
        System.out.println("My name is "+user.getUsername());
       cartService.addProduct(p, user,form.getQuantity());
       return true;
       
       /* try {
            mergeCart(Collections.singleton(new ProductInOrder(productInfo, form.getQuantity())), principal);
        } catch (Exception e) {
        	
            return false;
        }
        
        return true;
        */
    }
/*
    @PutMapping("/{itemId}")
    public Product modifyItem(@PathVariable("itemId") String itemId, @RequestBody Integer quantity, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : "));
         productInOrderService.update(itemId, quantity, user);
        return productInOrderService.findOne(itemId, user);
    }
*/
    @GetMapping("/getallorders")
    public List<OrderMain> getAllOrders(){
    	 return orderRepo.findAll();
    }
    @GetMapping("/getorders")
    public List<OrderMain> getOrders(){
    	String username=authService.getUsername();
    	User user = userService.findByUsername(username).orElseThrow(
    		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        return user.getOrders();
    }
    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable("itemId")long itemId){//, Principal principal) {
    	String username=authService.getUsername();
    	User user = userService.findByUsername(username).orElseThrow(
    		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        //User user = userService.findByUsername(principal.getName()).orElseThrow(
		//		() -> new UsernameNotFoundException("User Not Found with -> username or email : "));
         cartService.delete(itemId, user);
         // flush memory into DB
    }
    @GetMapping("/update/{id}/{qnt}")
    public List<ProductInOrder> update(@PathVariable("id")long id,@PathVariable("qnt") int qnt){
    	
    	ProductInOrder p=prodRepo.getOne(id);
    	p.setQnt(qnt);
    	prodRepo.save(p);
    	String username=authService.getUsername();
    	User user = userService.findByUsername(username).orElseThrow(
    		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        return cartService.getCart(user);
    	 
    }

/*
    @PostMapping("/checkout")
    public ResponseEntity checkout(Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));// Email as username
        cartService.checkout(user);
        return ResponseEntity.ok(null);
    }
*/
    @PostMapping("/charge")
    public void chargeCard(HttpServletRequest request) throws Exception {
        String token = request.getHeader("token");
        Double amount = Double.parseDouble(request.getHeader("amount"));
        //return
        this.stripeClient.chargeCreditCard(token, amount);
        OrderMain o=new OrderMain();
        o.setAmount(BigDecimal.valueOf(amount));
        Date d=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        o.setDate(formatter.format(d));
        String username=authService.getUsername();
    	User user = userService.findByUsername(username).orElseThrow(
    		() -> new UsernameNotFoundException("User Not Found with -> username or email : " ));
        
        o.setUser(user);
        user.getOrders().add(o);
        
       List<ProductInOrder>  l=user.getCart().getProducts();
       for(int i=0;i<l.size();i++) {
    	   ProductInOrder pr=l.get(i);
    	  List<ProductInOrder>l2=pr.getProduct().getOrders().stream()
    	  .filter(m->m.getProductioId()==pr.getProductioId())
    	  .map(m->m=null)
    	  .collect(Collectors.toList());
    	  pr.getProduct().setOrders(l2);   
    	  productService.save(pr.getProduct());
    	  prodRepo.deleteById(pr.getProductioId());
    	   
       }
       
       
        user.getCart().setProducts(null);
        
        userService.save(user);
        orderRepo.save(o);
        
    }

}