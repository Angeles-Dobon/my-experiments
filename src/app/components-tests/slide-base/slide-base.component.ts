import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CdkDrag, DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ElementModifierService } from '../../services/element-modifier-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slide-base',
  standalone: true,
  imports: [CdkDrag, FormsModule, CommonModule],
  templateUrl: './slide-base.component.html',
  styleUrl: './slide-base.component.scss',
})
export class SlideBaseComponent implements OnInit, AfterContentInit {
  dragRefs: DragRef[] = [];
  image: string = '';
  text: string = '';
  sizeElementWidth: number = 200;
  sizeElementHeight: number = 200;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dragDrop: DragDrop,
    private elementModifierService: ElementModifierService
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.initEditionSlideArea();
  }

  addElement(type: string) {
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');

    // Crear un nuevo elemento
    const newElement = this.renderer.createElement('div');

    // Agregar clase y atributos
    this.renderer.setAttribute(
      newElement,
      'cdkDragBoundary',
      '#example-boundary'
    );
    this.renderer.setAttribute(newElement, 'cdkDrag', '');
    this.renderer.addClass(newElement, 'cdk-drag');
    this.renderer.addClass(newElement, 'example-box');

    // Agregar contenido al nuevo elemento
    if (type === 'image') {
      // Crear el elemento de imagen
      const imgElement = this.renderer.createElement('img');

      // Configurar atributos de la imagen
      const normalizedPath = this.image.replace(/\\/g, '/'); // Reemplaza las contrabarras por barras normales
      const image = normalizedPath.split('/').pop();
      console.log('imageComplete', image);

      if (image) {
        this.renderer.setAttribute(imgElement, 'src', 'assets/images/' + image); // Ruta de la imagen
      }
      this.renderer.setAttribute(imgElement, 'alt', 'texto-alternativo'); // Texto alternativo
      this.renderer.addClass(imgElement, 'example-image'); // Clase para estilos

      this.renderer.appendChild(newElement, imgElement);
      this.deleteButton(newElement);
      this.resizeButton(newElement);
    } else if (type === 'text') {
      const text = this.renderer.createText(this.text);

      this.renderer.appendChild(newElement, text);
      this.deleteButton(newElement);
      this.resizeButton(newElement);
    }

    // Insertar el elemento en el contenedor
    this.renderer.appendChild(container, newElement);

    // Crear referencia de drag para el nuevo elemento
    const dragRef = this.dragDrop.createDrag(newElement);

    // Limitar el movimiento al contenedor
    dragRef.withBoundaryElement(container);

    this.dragRefs.push(dragRef);
  }

  deleteButton(newElement: any) {
    // Crear x de eliminación de elemento
    const XELEMENT = this.renderer.createElement('span');
    const DELETE = this.renderer.createText('X');
    this.renderer.appendChild(XELEMENT, DELETE);
    this.renderer.appendChild(newElement, XELEMENT);

    this.renderer.addClass(XELEMENT, 'delete-icon'); // Clase para estilos

    // Agregar el evento click dinámico
    this.renderer.listen(XELEMENT, 'click', (event) => {
      //console.log('event', event);
      const parentElement = event.target.parentNode; // Obtener el elemento padre (newElement)
      parentElement.remove(); // Eliminar el elemento concreto
    });
  }

  resizeButton(newElement: any) {
    // Crear resize para redimensionarv del elemento
    const EDITELEMENT = this.renderer.createElement('span');
    const EDIT = this.renderer.createText('resize');
    this.renderer.appendChild(EDITELEMENT, EDIT);
    this.renderer.appendChild(newElement, EDITELEMENT);

    this.renderer.addClass(EDITELEMENT, 'edit-icon'); // Clase para estilos

    // Agregar el evento click dinámico
    this.renderer.listen(EDITELEMENT, 'click', (event) => {
      //console.log('edit', event);

      const parentElement = event.target.parentNode; // Obtener el elemento padre (newElement)
      //console.log('parentElement', event.target);
      this.resizeElement(
        parentElement,
        this.sizeElementWidth + 'px',
        this.sizeElementHeight + 'px'
      ); //TODO: El usuarió decidirá las dimensiones
    });
  }

  resizeElement(div: any, width: string, height: string): void {
    this.renderer.setAttribute(
      div,
      'style',
      'width:' + width + ';' + ' height:' + height
    ); // Style
  }

  initEditionSlideArea() {
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');

    // Seleccionar todos los divs .example-box dentro del contenedor
    const divs = container.querySelectorAll('.example-box');

    // Iterar sobre los divs y aplicar las configuraciones
    divs.forEach((div: any) => {
      // Agregar clase y atributos
      this.renderer.setAttribute(div, 'cdkDragBoundary', '#example-boundary');
      this.renderer.setAttribute(div, 'cdkDrag', '');
      this.renderer.addClass(div, 'cdk-drag');

      // Crear referencia de drag para cada elemento
      const dragRef = this.dragDrop.createDrag(div);

      // Limitar el movimiento al contenedor
      dragRef.withBoundaryElement(container);

      // Guardar la referencia de drag
      this.dragRefs.push(dragRef);
    });

    // Seleccionar los botones delete
    const spans1 = container.querySelectorAll('.delete-icon');

    // Agregar el evento click dinámico
    spans1.forEach((span: HTMLElement) => {
      this.renderer.listen(span, 'click', (event) => {
        //console.log('event', event);
        const parentElement = event.target.parentNode; // Obtener el elemento padre (newElement)
        parentElement.remove(); // Eliminar el elemento concreto
      });
    });

    // Seleccionar los botones edit
    const spans2 = container.querySelectorAll('.edit-icon');
    // Agregar el evento click dinámico
    // Agregar el evento click dinámico
    spans2.forEach((span: HTMLElement) => {
      this.renderer.listen(span, 'click', (event) => {
        //console.log('edit', event);

        const parentElement = event.target.parentNode; // Obtener el elemento padre (newElement)
        //console.log('parentElement', event.target);
        this.resizeElement(
          parentElement,
          this.sizeElementWidth + 'px',
          this.sizeElementHeight + 'px'
        ); //TODO: El usuarió decidirá las dimensiones
      });
    });
  }

  saveSlideArea() {
    let array: HTMLElement[] = [];
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');
    if (container) {
      // Modificar los elementos del interior del div #example-boundary usando el servicio
      Array.from(container.children).forEach((el) => {
        if (el instanceof HTMLElement) {
          array.push(this.elementModifierService.modifyElement(el));
        }
      });
      array.forEach((el) => {
        console.log(el.outerHTML);
      });
    } else {
      console.warn('No se encontró el contenedor.');
    }
  }
}
