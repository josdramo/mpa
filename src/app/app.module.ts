import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, FormsModule]
})
export class AppModule { }
