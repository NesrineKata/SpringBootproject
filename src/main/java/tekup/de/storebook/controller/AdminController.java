package tekup.de.storebook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tekup.de.storebook.model.*;
import tekup.de.storebook.service.*;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/get")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
}
