import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {apiUrl, storeUrl} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import { Item } from '../entity/Item';
import { JwtResponse } from '../entity/JwtResponse';
import { ProductInOrder } from '../entity/ProductInOrder';
import { Product } from '../entity/Product';
import { Order } from '../entity/Order';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
    providedIn: 'root'
})
export class CartService {


    private cartUrl = `${storeUrl}/cart`;

    localMap = {};


    private itemsSubject: BehaviorSubject<Item[]>;
    private totalSubject: BehaviorSubject<number>;
    public items: Observable<Item[]>;
    public total: Observable<number>;


    private currentUser: JwtResponse;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private userService: UserService) {
        this.itemsSubject = new BehaviorSubject<Item[]>(null);
        this.items = this.itemsSubject.asObservable();
        this.totalSubject = new BehaviorSubject<number>(null);
        this.total = this.totalSubject.asObservable();
        this.userService.currentUser.subscribe(user => this.currentUser = user);


    }

    private getLocalCart(): Product[] {
        if (this.cookieService.check('cart')) {
            this.localMap = JSON.parse(this.cookieService.get('cart'));
            return Object.values(this.localMap);
        } else {
            this.localMap = {};
            return [];
        }
    }
    getOrders():Observable<any>{
        const url = `${this.cartUrl}/getorders`;
        return this.http.get<Order[]>(url);
    }
    getallOrders():Observable<any>{
        const url = `${this.cartUrl}/getallorders`;
        return this.http.get<Order[]>(url);
    }
    updateCart(id,qnt):Observable<any>{
        const url = `${this.cartUrl}/update/${id}/${qnt}`;
        return this.http.get<ProductInOrder[]>(url);
    }
    getCart(): Observable<any> {
        const url = `${this.cartUrl}/getall`;
        /*
        const localCart = this.getLocalCart();
        if (this.currentUser) {
            if (localCart.length > 0) {
                return this.http.post<Cart>(url, localCart).pipe(
                    tap(_ => {
                        this.clearLocalCart();
                    }),
                    map(cart => cart.products),
                    catchError(_ => of([]))
                );
            } else {
                return this.http.get<Product[]>(url);
            }
        } else {
            return of(localCart);
        }
       */ 
       return this.http.get<ProductInOrder[]>(url);
    }

    addItem(productInOrder): Observable<boolean> {
       /* if (!this.currentUser) {
            if (this.cookieService.check('cart')) {
                this.localMap = JSON.parse(this.cookieService.get('cart'));
            }
            if (!this.localMap[productInOrder.productinId]) {
                this.localMap[productInOrder.productId] = productInOrder.productId;
            } else {
                this.localMap[productInOrder.productId].count+=1;
            }
            this.cookieService.set('cart', JSON.stringify(this.localMap));
            return of(true);
        } else {
         */   
            const url = `${this.cartUrl}/add`;
            return this.http.post<boolean>(url, {
                'quantity': 1,
                'productId': productInOrder.productId
            });
        //}
    }

/*    update(productInOrder): Observable<ProductInOrder> {

        if (this.currentUser) {
            const url = `${this.cartUrl}/${productInOrder.productId}`;
            return this.http.put<ProductInOrder>(url, productInOrder.count);
        }
    }

*/
    remove(p) {
        /*if (!this.currentUser) {
            delete this.localMap[productInOrder.productId];
            return of(null);
        } else {
            */
           const url = `${this.cartUrl}/${p}`;
            return this.http.delete(url);//.pipe( );
        }
    }


/*
    checkout(): Observable<any> {
        const url = `${this.cartUrl}/checkout`;
        return this.http.post(url, null).pipe();
    }

    storeLocalCart() {
        this.cookieService.set('cart', JSON.stringify(this.localMap));
    }

    clearLocalCart() {
        console.log('clear local cart');
        this.cookieService.delete('cart');
        this.localMap = {};
    }
    }
*/
