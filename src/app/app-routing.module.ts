import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from './features/feature-list/feature-list.component';
import { FeatureCreateComponent } from './features/feature-create/feature-create.component';

const routes: Routes = [
  {path: '', component: FeatureListComponent },
  {path: 'create', component: FeatureCreateComponent },
  {path: 'edit/:featureId', component: FeatureCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {



}
