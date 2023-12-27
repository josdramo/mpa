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
      this.data = dataArray;
      this.aplicarFiltro();
    })
  }

  aplicarFiltro() {
    console.log("Filtro actual:", this.filtroPrecio);
    let productosFiltradosTemp: Producto[];
  
    if (this.filtroPrecio === "menor") {
      productosFiltradosTemp = this.data.sort((a, b) => a.Price - b.Price).slice(0, 10);
    } else if (this.filtroPrecio === "mayor") {
      productosFiltradosTemp = this.data.sort((a, b) => b.Price - a.Price).slice(0, 10);
    } else {
      productosFiltradosTemp = this.data.slice(0, 10);
    }
  
    // Asignamos una nueva referencia de array
    this.productosFiltrados = [...productosFiltradosTemp];
    console.log("Productos filtrados:", this.productosFiltrados.length);
  }
}
