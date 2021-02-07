package tekup.de.storebook.service;

import java.util.List;

import tekup.de.storebook.model.*;

public interface UserService {
	
	public User save(User userInfo);
    public void delete(long userId);
    public List<User> getUsers();
    public User updateUser(User p);
	

}
