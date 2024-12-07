import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CdkDrag, DragDrop, DragRef } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slide-base',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './slide-base.component.html',
  styleUrl: './slide-base.component.scss',
})
export class SlideBaseComponent {
  dragRefs: DragRef[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dragDrop: DragDrop
  ) {}

  addElement(type: string, content: string) {
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
      this.renderer.setAttribute(imgElement, 'src', content); // Ruta de la imagen
      this.renderer.setAttribute(imgElement, 'alt', 'texto-aleternativo'); // Texto alternativo
      this.renderer.addClass(imgElement, 'example-image'); // Clase para estilos

      this.renderer.appendChild(newElement, imgElement);
      this.delete(newElement);
    } else if (type === 'text') {
      const text = this.renderer.createText(content);

      this.renderer.appendChild(newElement, text);
      this.delete(newElement);
    }

    // Insertar el elemento en el contenedor
    this.renderer.appendChild(container, newElement);

    // Crear referencia de drag para el nuevo elemento
    const dragRef = this.dragDrop.createDrag(newElement);

    // Limitar el movimiento al contenedor
    dragRef.withBoundaryElement(container);

    this.dragRefs.push(dragRef);
  }

  delete(newElement: any) {
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

  saveSlideArea() {
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');
    console.log(container);
  }
}
