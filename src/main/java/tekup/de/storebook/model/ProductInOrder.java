package tekup.de.storebook.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@Entity
public class ProductInOrder {
	@Id
	@GeneratedValue
	@Column(name = "productioId")
	private long productioId;
	@ManyToOne
	//@JsonIgnore
	private Product  product ;
	private int qnt;
	@ManyToOne
	//@JsonIgnore
	private Cart cart ;
	
}
