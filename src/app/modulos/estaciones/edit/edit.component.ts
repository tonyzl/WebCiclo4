import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModel } from 'src/app/modelos/estacion.model';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
      id: ['', [Validators.required]],   
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      coordenada_x: ['', [Validators.required]],
      coordenada_y: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    });

    ngOnInit(): void {
      let id = this.route.snapshot.params["id"]
      this.getWithId(id)
    }
  
    getWithId(id: string){
      this.estacionService.getWithId(id).subscribe((data: EstacionModel) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["nombre"].setValue(data.nombre as string)
        this.fgValidacion.controls["direccion"].setValue(data.direccion as string)
        this.fgValidacion.controls["coordenada_x"].setValue(data.coordenada_x as string)
        this.fgValidacion.controls["coordenada_y"].setValue(data.coordenada_y as string)
        this.fgValidacion.controls["tipo"].setValue(data.tipo as string)
      })
    }

  edit(){
      let estacion= new EstacionModel();
      estacion.id = this.fgValidacion.controls["id"].value as string;
      estacion.nombre = this.fgValidacion.controls["nombre"].value as string;
      estacion.direccion = this.fgValidacion.controls["direccion"].value as string;
      estacion.coordenada_x = this.fgValidacion.controls["coordenada_x"].value as string;
      estacion.coordenada_y = this.fgValidacion.controls["coordenada_y"].value as string;
      estacion.tipo = this.fgValidacion.controls["tipo"].value as string;
   
      this.estacionService.update(estacion).subscribe((data: EstacionModel)=> {
        Swal.fire('Editado correctamente!', '', 'success')
        this.router.navigate(['/estaciones/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }



}