import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2'
import { EstacionService } from 'src/app/servicios/estacion.service';
import { EstacionModel } from 'src/app/modelos/estacion.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router) { }

  fgValidacion = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
    });

    listadoEstaciones: EstacionModel[] = []  
    
  store(){
      let ruta= new RutaModel();
      ruta.origen = this.fgValidacion.controls["origen"].value as string;
      ruta.destino = this.fgValidacion.controls["destino"].value as string;
      ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value as string;
   
      this.rutaService.store(ruta).subscribe((data: RutaModel)=> {
        Swal.fire('Creado correctamente!', '', 'success')
        this.router.navigate(['/rutas/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  ngOnInit(): void {
    this.getEstaciones()
  }

  getEstaciones(){
    this.estacionService.getAll().subscribe((data: EstacionModel[]) => {
      this.listadoEstaciones = data
      console.log(data)
    })
  }

}