import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstacionModel } from 'src/app/modelos/estacion.model';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router) { }

  fgValidacion = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      coordenada_x: ['', [Validators.required]],
      coordenada_y: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });
    
  store(){
      let estacion= new EstacionModel();
      estacion.nombre = this.fgValidacion.controls["nombre"].value as string;
      estacion.direccion = this.fgValidacion.controls["direccion"].value as string;
      estacion.coordenada_x = this.fgValidacion.controls["coordenada_x"].value as string;
      estacion.coordenada_y = this.fgValidacion.controls["coordenada_y"].value as string;
      estacion.tipo = this.fgValidacion.controls["tipo"].value as string;
   
      this.estacionService.store(estacion).subscribe((data: EstacionModel)=> {
        Swal.fire('Creado correctamente!', '', 'success')
        this.router.navigate(['/estaciones/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

  ngOnInit(): void {
  }

}