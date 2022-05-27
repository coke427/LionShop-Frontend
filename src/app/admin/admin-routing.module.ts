import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EditProductoComponent } from './producto/edit-producto/edit-producto.component';
import { NewProductoComponent } from './producto/new-producto/new-producto.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'productos',
        component: ProductoListComponent,
      },
      {
        path: 'productos/new',
        component: NewProductoComponent,
      },
      {
        path: 'productos/:id/edit',
        component: EditProductoComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
