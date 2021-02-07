package tekup.de.storebook.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.Charge;
@Service
public class StripeClient {

    @Autowired
    public StripeClient() {
        Stripe.apiKey = "sk_test_51IFiXoAE6Ixp3fxxbrnM0hVVztcxRdHi80vhZeHhXNFzlesOEBo7THEeUp5SNU0l3bK1hCQIlWIugUTqQPHjqQdV007pVxz8ij";
    }

    public void chargeCreditCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
       // return charge;
    }
}