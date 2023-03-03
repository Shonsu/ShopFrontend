import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {MatProgressSpinnerModule, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatBadgeModule,
        MatRadioModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatCheckboxModule
        
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        MatBadgeModule,
        MatRadioModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressSpinnerModule,
        MatCheckboxModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ]
})
export class MaterialModule { }
