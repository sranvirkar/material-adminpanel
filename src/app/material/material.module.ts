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
  MatTableModule } from '@angular/material';

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
];

@NgModule({
  imports: [materialCompoent],
  exports: [materialCompoent]
})
export class MaterialModule { }
