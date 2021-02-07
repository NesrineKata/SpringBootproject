package tekup.de.storebook.security;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import tekup.de.storebook.message.request.LoginForm;
import tekup.de.storebook.message.request.SignUpForm;



public interface IAuthService {
	
	ResponseEntity<?> authenticateUser(LoginForm loginRequest);

	ResponseEntity<?> registerUser(SignUpForm signupRequest);
	Optional<org.springframework.security.core.userdetails.User> getCurrentUser();
	public String getUsername();
	public void setUsername(String s);
}
