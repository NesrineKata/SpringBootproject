package tekup.de.storebook.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import tekup.de.storebook.message.request.LoginForm;
import tekup.de.storebook.message.request.SignUpForm;
import tekup.de.storebook.model.User;
import tekup.de.storebook.repository.UserRepository;
import tekup.de.storebook.security.IAuthService;
import tekup.de.storebook.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    UserRepository userService;
    @Autowired
	private IAuthService authService;
    @Autowired 
    UserService userserv; 
  

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
		return authService.authenticateUser(loginRequest);
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signupRequest) {
		return authService.registerUser(signupRequest);
	} 
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable("id") long id ) {
		this.userService.deleteById(id);
	}
	@GetMapping("/getbyusername/{user}")
	public User getByUsername(@PathVariable("user") String username) {
		Optional<User> op=this.userService.findByUsername(username);
		User u;
		if(op.isPresent()) {
			u=op.get();
		}
		else
			u=new User();
		return u;
	}
    



    /*@PutMapping("/profile")
    public ResponseEntity<User> update(@RequestBody User user, Principal principal) {

        try {
            if (!principal.getName().equals(user.getEmail())) throw new IllegalArgumentException();
            return ResponseEntity.ok(userService.update(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    */
    /*
    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getProfile(@PathVariable("email") String email, Principal principal) {
        if (principal.getName().equals(email)) {
            return ResponseEntity.ok(userService.findOne(email));
        } else {
            return ResponseEntity.badRequest().build();
        }

    }
    */
}