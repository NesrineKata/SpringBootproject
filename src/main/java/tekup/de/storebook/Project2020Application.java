package tekup.de.storebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import tekup.de.storebook.security.WebConfig;


@SpringBootApplication
@Import(WebConfig.class)

public class Project2020Application {
	
	public static void main(String[] args) {
		SpringApplication.run(Project2020Application.class, args);
	}

}
