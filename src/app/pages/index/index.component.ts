import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Producto } from '../../interfaces/producto';
import { ServicioService } from '../../providers/servicio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  providers: [ServicioService],
  imports: [CommonModule, HttpClientModule, RouterLinkActive, RouterLink, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent {
  public data: Producto[] = [];
  public productosFiltrados: Producto[] = [];
  public filtroPrecio: string = "menor";

  //Inyección de dependencia del servicio
  constructor(private dataProvider: ServicioService) { }

  //Ejecución de la petición y suscripción de la respuesta

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Producto[]);
      this.data = dataArray.map((producto, index) => ({
        ...producto,
        Nombre: `Producto ${index + 1}`,
        ImagenAlt: `Producto ${index + 1}`
      }));
      this.aplicarFiltro();
    })
  }

  aplicarFiltro() {
    let productosFiltradosTemp: Producto[];
  
    if (this.filtroPrecio === "menor") {
      productosFiltradosTemp = this.data.sort((a, b) => a.Price - b.Price).slice(0, 5);
    } else if (this.filtroPrecio === "mayor") {
      productosFiltradosTemp = this.data.sort((a, b) => b.Price - a.Price).slice(0, 5);
    } else {
      productosFiltradosTemp = this.data.slice(0, 10);
    }
  
    // Redondear los precios a dos decimales
    this.productosFiltrados = productosFiltradosTemp.map(producto => ({
      ...producto,
      Price: parseFloat(producto.Price.toFixed(2))
    }));
  }
}
