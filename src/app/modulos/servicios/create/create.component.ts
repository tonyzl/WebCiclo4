import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'
import { RutaService } from 'src/app/servicios/ruta.service';
import { RutaModel } from 'src/app/modelos/ruta.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private rutaService: RutaService,
    private router: Router) { }

  fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa: ['', [Validators.required, Validators.minLength(6)]],
      nombre_conductor: ['', [Validators.required]],
      dinero_recogido: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
    });

    listadoRutas: RutaModel[] = []    
    
  store(){
      let servicio= new ServicioModel();
      servicio.fecha = this.fgValidacion.controls["fecha"].value as string;
      servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value as string;
      servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value as string;
      servicio.placa = this.fgValidacion.controls["placa"].value as string;
      servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value as string;
      servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value as string;
      servicio.ruta = this.fgValidacion.controls["ruta"].value as string;
   
      this.servicioService.store(servicio).subscribe((data: ServicioModel)=> {
        Swal.fire('Creado correctamente!', '', 'success')
        this.router.navigate(['/servicios/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  ngOnInit(): void {
    this.getRutas()
  }

  getRutas(){
    this.rutaService.getAll().subscribe((data: RutaModel[]) => {
      this.listadoRutas = data
      console.log(data)
    })
  }

}