import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminProductUpdateComponent } from 'src/app/modules/admin/admin-product-update/admin-product-update.component';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FullpageadminComponent } from './fullpageadmin.component';

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductComponent,
    AdminProductUpdateComponent
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
