import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminCategoryAddComponent } from 'src/app/modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryFormComponent } from 'src/app/modules/admin/admin-category/admin-category-form/admin-category-form.component';
import { AdminCategoryUpdateComponent } from 'src/app/modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from 'src/app/modules/admin/admin-category/admin-category.component';
import { AdminConfirmDialogComponent } from 'src/app/modules/admin/common/component/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminMessageComponent } from 'src/app/modules/admin/common/component/admin-message/admin-message.component';
import { AdminProductAddComponent } from 'src/app/modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductFormComponent } from 'src/app/modules/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductUpdateComponent } from 'src/app/modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FullpageadminComponent } from './fullpageadmin.component';
import { AdminReviewComponent } from 'src/app/modules/admin/admin-review/admin-review.component';
import { AdminReviewUpdateComponent } from 'src/app/modules/admin/admin-review/admin-review-update/admin-review-update.component';
import { AdminOrderComponent } from 'src/app/modules/admin/admin-order/admin-order.component';
import { AdminOrderUpdateComponent } from 'src/app/modules/admin/admin-order/admin-order-update/admin-order-update.component';

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductComponent,
    AdminProductUpdateComponent,
    AdminProductAddComponent,
    AdminProductFormComponent,
    AdminMessageComponent,
    AdminConfirmDialogComponent,
    AdminCategoryComponent,
    AdminCategoryAddComponent,
    AdminCategoryUpdateComponent,
    AdminCategoryFormComponent,
    AdminReviewComponent,
    AdminReviewUpdateComponent,
    AdminOrderComponent,
    AdminOrderUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule { }
