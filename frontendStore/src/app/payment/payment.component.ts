import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/*import {
  StripeService,
  ElementOptions,
  ElementsOptions,
  StripeCardComponent
} from 'ngx-stripe';
*/
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
 
export class PaymentComponent implements OnInit{
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
amount:number;
stripeTest: FormGroup;

constructor(private fb: FormBuilder,private stripeService: StripeService,private route: ActivatedRoute,private router:Router,private http:HttpClient) { }

ngOnInit(): void {
  this.route.queryParams.subscribe(
    (params) => {
      this.amount=params.amount;

  });
  this.stripeTest = this.fb.group({
    name: ['', [Validators.required]]
  });
  
}
createToken(): void {
  const name = this.stripeTest.get('name').value;
  this.stripeService
    .createToken(this.card.element, { name })
    .subscribe((result) => {
      if (result.token) {
        // Use the token
        console.log(result.token.id);
        
       this.chargeCard(result.token.id);
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });

}
chargeCard(token: string) {
  const headers = new HttpHeaders({'token': token,'amount':this.amount.toString()});
  this.http.post('http://localhost:8080/api/store/cart/charge', {}, {headers: headers})
    .subscribe(resp => {
     
      this.router.navigateByUrl("/");
      console.log("charge done "+resp);
      
     
    })
}

}/* implements OnInit{

amount:any;
title = 'try';
constructor(private route: ActivatedRoute,private router:Router,private http:HttpClient,public stripeScriptTag: StripeScriptTag) { 
  console.log('setting publish key')
    stripeScriptTag.setPublishableKey('pk_test_51IFiXoAE6Ixp3fxxIVwgn4XHav4gOoAZk0gC5IJylVU01Ul9ABwRLhs13nA6lEo3fZkonyKy1YsjySFODOqdqtKL00PXOmBSr9')
    .then(()=>console.log('publish key set'))
}
ngOnInit(): void {
  this.route.queryParams.subscribe(
    (params) => {
      this.amount=params.amount;

  });
  
}
}

/*implements  OnInit {
  amount :any;
 

  

  

  constructor(private route: ActivatedRoute,private router:Router,private http:HttpClient) { 

  }
  

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        this.amount=params.amount;

    });

    

   
    var styleCard =  {
      'style': {
        'base': {
          'fontFamily': 'Arial, sans-serif',
          'fontSize': '8px',
          'color': '#C1C7CD',
        },
        'Invalid': {  'color': 'red', },
      }
    };
    var elements =stripe.elements();
    var card = elements.create("card", { hidePostalCode: true, style: styleCard });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");
    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    function createToken() {
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
         stripeTokenHandler(result.token);
        }
      });
    };
   
    
    // Create a token when the form is submitted.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      createToken();
    });
   
 
  }

 

  
 
 
}
*/
