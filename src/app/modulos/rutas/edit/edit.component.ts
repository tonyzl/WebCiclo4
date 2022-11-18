import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModel } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2'
import { EstacionService } from 'src/app/servicios/estacion.service';
import { EstacionModel } from 'src/app/modelos/estacion.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutaService: RutaService,
    private estacionService: EstacionService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
      id: ['', [Validators.required]], 
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tiempo_estimado: ['', [Validators.required]],
    });

    ngOnInit(): void {
      let id = this.route.snapshot.params["id"]
      this.getWithId(id)
      this.getEstaciones()
    }
  
  
    getWithId(id: string){
      this.rutaService.getWithId(id).subscribe((data: RutaModel) => {
        console.log(data)
        this.fgValidacion.controls["id"].setValue(id)
        this.fgValidacion.controls["origen"].setValue(data.origen as string)
        this.fgValidacion.controls["destino"].setValue(data.destino as string)
        this.fgValidacion.controls["tiempo_estimado"].setValue(data.tiempo_estimado as string)

      })
    }

    listadoEstaciones: EstacionModel[] = []  
    
    getEstaciones(){
      this.estacionService.getAll().subscribe((data: EstacionModel[]) => {
        this.listadoEstaciones = data
        console.log(data)
      })
    }

  edit(){
      let ruta= new RutaModel();
      ruta.id = this.fgValidacion.controls["id"].value as string;
      ruta.origen = this.fgValidacion.controls["origen"].value as string;
      ruta.destino = this.fgValidacion.controls["destino"].value as string;
      ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value as string;
   
      this.rutaService.store(ruta).subscribe((data: RutaModel)=> {
        Swal.fire('Editado correctamente!', '', 'success')
        this.router.navigate(['/rutas/get']);
      },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}