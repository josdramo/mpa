import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'about', component: AboutComponent }
];
