import { NgModule } from '@angular/core';
import { DialogAddHero } from './components/dialog-add-hero/dialog-add-hero.component';
import { DialogAuth } from './components/dialog-auth/dialog-auth.component';

import {
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    entryComponents: [DialogAddHero, DialogAuth],
    exports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }