import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';



@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  idProducto : number;
  public producto:Producto;

  @Input() productoEdit: Producto = new Producto();

  constructor(public productoService: ProductoService,private router:Router,
    private activeRoute: ActivatedRoute,  private formBuilder: FormBuilder) { 
      this.activeRoute.paramMap.subscribe(paramMap =>{
        this.idProducto = Number(paramMap.get('id'));
        this.productoService.get(this.idProducto).subscribe((data:any)=>{
          this.producto=data;
          console.log(this.producto);
        });
      })
    }

  ngOnInit(): void {
  }

  update(producto:any){
    this.productoService.update(producto).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigate(['/productos'])
      },
      (err)=> {
        console.log(err);
      }
    );
  }
  
  form=new FormGroup({
      nombre_producto: new FormControl('',Validators.required),
      categoria_producto: new FormControl('',Validators.required),
      costo_producto: new FormControl('',Validators.required),
  });

  save(form: Producto){
    form.idProducto = this.idProducto;
    this.productoService.update(form).subscribe(()=>{
      this.router.navigate(['/productos']);
    },(error:any)=>{

    })
  }

}