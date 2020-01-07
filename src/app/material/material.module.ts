import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatRadioModule } from '@angular/material';

const materialCompoent = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  OverlayModule,
  MatSnackBarModule,
  MatRadioModule,
];

@NgModule({
  imports: [materialCompoent],
  exports: [materialCompoent]
})
export class MaterialModule { }
