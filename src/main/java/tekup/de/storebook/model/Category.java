package tekup.de.storebook.model;


import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
@Data
@Entity
public class Category {
	 @Id
	 @GeneratedValue
     private long id;
     private String libelle;
     @OneToMany(mappedBy = "category",cascade = CascadeType.REMOVE)
     @JsonIgnore
 	private List<Product> products;
     

}
