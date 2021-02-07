package tekup.de.storebook.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tekup.de.storebook.model.User;
import tekup.de.storebook.repository.UserRepository;
import tekup.de.storebook.service.UserService;
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;
	@Override
	public User save(User userInfo) {
		userRepo.save(userInfo);
		return userInfo;
		
	}

	@Override
	public void delete(long userId) {
		userRepo.deleteById(userId);
		
	}

	@Override
	public List<User> getUsers() {
	
		return userRepo.findAll();
	}

	@Override
	public User updateUser(User u) {
		User old=userRepo.getOne(u.getId());
		  if(u.getName()!=null) {
			  old.setName(u.getName());
			  
		  }
		  if(u.getUsername()!=null) {
			  old.setUsername(u.getUsername());
			  
		  }
		  if(u.getEmail()!=null) {
			  old.setEmail(u.getEmail());
			  
		  }if(u.getPassword()!=null) {
			  old.setPassword(u.getPassword());
			  
		  }
		  
		  userRepo.save(old);
		  return old;
	}

}
