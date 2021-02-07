package tekup.de.storebook.model;


import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@Entity
@Table(name="product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "productid")
	private long productId;
	@Column(name = "productname")
    private String productName;
	@Column(name = "productprice")
    private BigDecimal productPrice;
	private int stock;
	private int avaibility;
	@Column(name="url")
	private String url;
	@ManyToOne
	 @JoinColumn(name = "idcategory")
	@JsonIgnore
	private Category category;
	@OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<ProductInOrder> orders;
	public boolean equals(Product p) {
		if(this.getProductId()==p.getProductId())
				return true;
		else
				return false;
	}
	
	


}
