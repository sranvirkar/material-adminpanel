import { NgModule } from '@angular/core';
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
  MatProgressSpinnerModule } from '@angular/material';

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
  MatProgressSpinnerModule
];

@NgModule({
  imports: [materialCompoent],
  exports: [materialCompoent]
})
export class MaterialModule { }
