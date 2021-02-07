package tekup.de.storebook.model;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity()
@Table(name = "ordermain")
public class OrderMain {
	 @Id
	 @GeneratedValue
     private long id;
	private BigDecimal amount;
	private String date;
	@ManyToOne
	//@JsonIgnore
	@JoinColumn(name="user_id")
	private User user;
}
