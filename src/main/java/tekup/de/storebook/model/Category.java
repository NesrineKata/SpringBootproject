package tekup.de.storebook.model;


import javax.persistence.*;

import lombok.Data;
@Data
@Entity
public class Category {
	 @Id
	 @GeneratedValue
     private int id;
     private String libelle;
     

}
