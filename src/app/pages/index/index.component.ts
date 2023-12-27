import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { Producto } from '../../interfaces/producto';
import { ServicioService } from '../../providers/servicio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [ServicioService],
  imports: [CommonModule, HttpClientModule, RouterLinkActive, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent {
  public data : Producto[] = [];
  public productosFiltrados: Producto[] = [];
  public filtroPrecio: string = "menor";

   //Inyección de dependencia del servicio
   constructor(private dataProvider: ServicioService) { }

   //Ejecución de la petición y suscripción de la respuesta

   ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Producto[]); 
      this.data = dataArray.slice(0,10);
      this.aplicarFiltro();
    })
  }

  aplicarFiltro() {
    if (this.filtroPrecio === "menor") {
      this.productosFiltrados = this.data.slice().sort((a, b) => a.Price - b.Price).slice(0, 10);
    } else if (this.filtroPrecio === "mayor") {
      this.productosFiltrados = this.data.slice().sort((a, b) => b.Price - a.Price).slice(0, 10);
    }
  }
}
