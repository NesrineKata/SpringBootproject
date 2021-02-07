import { Product } from "./Product";

export class ProductInOrder {
    
    product:Product;
    qnt: number;
    productioId:number;

    constructor(id,productioId,productInfo:Product, q){
        this.product=productInfo;
        this.qnt=q;
        this.productioId=productioId;

    }
}