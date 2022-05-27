import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../producto.model';
import { ProductoService } from '../producto.service';



@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  form: FormGroup;
  producto: Producto;
  @Output() onSave: EventEmitter<any>= new EventEmitter();
  constructor(
    private productoService: ProductoService,
    private formBuilder:FormBuilder,
    private router:Router
    ) { }
  
  
    ngOnInit(): void {
      this.form=new FormGroup({
        nombre_producto: new FormControl('',Validators.required),
        categoria_producto: new FormControl('',Validators.required),
        costo_producto: new FormControl('',Validators.required),
      });
    }
    
    save(){
      let producto = new Producto();
      
      producto.nombre_producto=this.form.value['nombre_producto']
      producto.categoria_producto=this.form.value['categoria_producto']
      producto.costo_producto=this.form.value['costo_producto']
      this.onSave.emit(producto);
    }

}
