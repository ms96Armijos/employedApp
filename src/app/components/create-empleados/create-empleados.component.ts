import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;

  constructor(private formulario: FormBuilder, private _empleadoService: EmpleadoService, private _router: Router) {
    this.createEmpleado = this.formulario.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  agregarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid) return;

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      console.log('empleado registrado correctamente');
      this._router.navigate(['/list-empleados'])
    }).catch(error=>{
      console.log(error);
    });
  }

}
