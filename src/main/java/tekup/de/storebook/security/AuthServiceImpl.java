package tekup.de.storebook.security;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import tekup.de.storebook.message.request.LoginForm;
import tekup.de.storebook.message.request.SignUpForm;
import tekup.de.storebook.message.response.JwtResponse;
import tekup.de.storebook.message.response.MessageResponse;
import tekup.de.storebook.model.*;
import tekup.de.storebook.security.jwt.*;
import tekup.de.storebook.repository.*;

@Service
public class AuthServiceImpl implements IAuthService {

	private String username;
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepositiry;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
		@Override
	public ResponseEntity<?> authenticateUser(LoginForm loginRequest) {
		try {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		this.setUsername(userDetails.getUsername());
		System.out.println("Im the principale"+userDetails.getUsername());
		//List roles for our user 
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		
		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
		}catch(AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

		}
		}

	@Override
	public ResponseEntity<?> registerUser(SignUpForm signupRequest) {
		try {
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
		}

		User user = new User(signupRequest.getName(),signupRequest.getUsername(), signupRequest.getEmail(),
				encoder.encode(signupRequest.getPassword()));

		List<String> stRoles = signupRequest.getRole();
		List<Role> roles = new ArrayList();

		if (stRoles == null) {

			Role useRole = roleRepositiry.findByName(RoleName.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is notfound."));
			roles.add(useRole);
		} else {
			stRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepositiry.findByName(RoleName.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is notfound."));
					roles.add(adminRole);
				
				default:

					Role userRole = roleRepositiry.findByName(RoleName.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
		}catch(Exception e) {
            return ResponseEntity.badRequest().build();

		}
		
		
		}
	public String getUsername() {
		return this.username;
	}
	public void setUsername(String user) {
		this.username=user;
	}
	 public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
	        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	        return Optional.of(principal);
	    }
	

}