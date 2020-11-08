package tekup.de.storebook.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="product")
public class Product {
	@Id
	@GeneratedValue
	@Column(name = "productid")
	private int productId;
	@Column(name = "productname")
    private String productName;
	@Column(name = "productprice")
    private String productPrice;
   // @Column(name = "picbyte", length = 1000000000)
	//private byte[] picByte;
	@Column(name="url")
	private String url;
	@Column(name = "idcategory")
    private int  idCategory;

}
