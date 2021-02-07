package tekup.de.storebook.message.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductForm {
	
	private String productName;
	private BigDecimal productPrice;
	private int stock;
	private int avaibility;
	private long category;
	private String url;
	
}
