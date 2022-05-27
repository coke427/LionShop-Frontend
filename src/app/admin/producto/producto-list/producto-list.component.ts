import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';



@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  displayedColumns: string[] = ['idProducto', 'nombre_producto', 'categoria_producto', 'costo_producto'];
  dataSource : MatTableDataSource<Producto>;


  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(){
    this.productoService.getAllProductos().subscribe((data:any)=>{
          this.dataSource=new MatTableDataSource(data['body']);
        });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
  eliminar(id: number) {
    const ok = confirm('¿Estás seguro de eliminar el producto?');
    if (ok) {
      this.productoService.delete(id).subscribe(() => {
        this.getAllProductos();
      });
    }
  }

}
