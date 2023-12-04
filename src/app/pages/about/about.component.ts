import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { Producto } from '../../interfaces/producto';
import { ServicioService } from '../../providers/servicio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  providers: [ServicioService],
  imports: [CommonModule, HttpClientModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public data : Producto[] = [];
   //Inyección de dependencia del servicio
   constructor(private dataProvider: ServicioService) { }

   //Ejecución de la petición y suscripción de la respuesta

   ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Producto[]); 
      this.data = dataArray.slice(0,10);
    })
  }
}

