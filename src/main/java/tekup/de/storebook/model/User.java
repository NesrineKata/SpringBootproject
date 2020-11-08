package tekup.de.storebook.model;

import javax.persistence.*;
import lombok.Data;
@Data
@Entity
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String password;
    private String name;
}
