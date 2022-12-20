import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { CartIconService } from '../common/service/cart-icon.service';
import { CartService } from './cart.service';
import { CartSummary } from './model/cartSummary';
import { CartSummaryItem } from './model/cartSummaryItem';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    summary!: CartSummary;
    formGroup!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private cookieService: CookieService,
        private router: Router,
        private formBuilder: FormBuilder,
        private cartIconService: CartIconService
    ) { }

    ngOnInit(): void {
        let id = Number(this.route.snapshot.queryParams['productId']);
        if (id > 0) {
            this.addToCart(id);
        } else {
            this.getCart();
        }
        this.formGroup = this.formBuilder.group({
            items: this.formBuilder.array([])
        })
    }

    getCart() {
        let cartId = Number(this.cookieService.get("cartId"));
        if (cartId > 0) {
            this.cartService.getCart(cartId)
                .subscribe(summary => {
                    this.summary = summary;
                    this.patchFormItems();
                    this.cartIconService.cartChanged(summary.items.length);
                });
        }
    }

    addToCart(id: number) {
        let cartId = Number(this.cookieService.get("cartId"));
        this.cartService.addToCart(cartId, { productId: id, quantity: 1 })
            .subscribe(summary => {
                this.summary = summary;
                this.patchFormItems();
                this.cartIconService.cartChanged(summary.items.length);
                this.cookieService.delete("cartId");
                this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
                this.router.navigate(["/cart"]);
            });
    }

    patchFormItems() {
        let formItems = <FormArray>this.formGroup.get("items");
        this.summary.items.forEach(item => {
            formItems.push(this.formBuilder.group({
                id: [item.id],
                quantity: [item.quantity],
                product: [item.product],
                lineValue: [item.lineValue]
            }))
        })
    }

    
    submit() {
        let cartId = Number(this.cookieService.get("cartId"));
        this.cartService.updateCart(cartId, this.mapToRewuestListDto())
        .subscribe(summary => {
            this.summary = summary;
            this.formGroup.get("items")?.setValue(summary.items)
        });
    }

    deleteItem(itemId: number){
        console.log(itemId);
        this.cartService.deleteCartItem(itemId)
        .subscribe(()=>this.ngOnInit());
    }

    expiresDays(days: number): Date {
        return new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    mapToRewuestListDto(): any[] {
        let items: Array<CartSummaryItem> = this.formGroup.get("items")?.value;
        return items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
        }))
    }

    get items() {
        return (<FormArray>this.formGroup.get("items")).controls;
    }

}
