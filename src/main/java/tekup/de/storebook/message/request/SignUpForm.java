package tekup.de.storebook.message.request;

import java.util.List;
import java.util.Set;

import javax.validation.constraints.*;

import lombok.Data;
@Data
public class SignUpForm {
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Size(max = 60)
    @Email
    private String email;
    
    private List<String> role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}