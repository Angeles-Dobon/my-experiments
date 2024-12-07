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

  addElement() {
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
    const text = this.renderer.createText(
      'Este es un nuevo elemento arrastrable'
    );
    this.renderer.appendChild(newElement, text);

    // Insertar el elemento en el contenedor
    this.renderer.appendChild(container, newElement);

    // Crear referencia de drag para el nuevo elemento
    const dragRef = this.dragDrop.createDrag(newElement);

    // Limitar el movimiento al contenedor
    dragRef.withBoundaryElement(container);

    this.dragRefs.push(dragRef);
  }

  addImage() {
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');

    // Crear un nuevo elemento para contener la imagen
    const newElement = this.renderer.createElement('div');

    // Agregar clases y atributos para el elemento contenedor
    this.renderer.setAttribute(
      newElement,
      'cdkDragBoundary',
      '#example-boundary'
    );
    this.renderer.setAttribute(newElement, 'cdkDrag', '');
    this.renderer.addClass(newElement, 'cdk-drag');
    this.renderer.addClass(newElement, 'example-box');

    // Crear el elemento de imagen
    const imgElement = this.renderer.createElement('img');

    // Configurar atributos de la imagen
    this.renderer.setAttribute(
      imgElement,
      'src',
      'assets/images/vector-web-icon.jpg'
    ); // Ruta de la imagen
    this.renderer.setAttribute(imgElement, 'alt', 'vector-web-icon'); // Texto alternativo
    this.renderer.addClass(imgElement, 'example-image'); // Clase para estilos

    // Insertar la imagen dentro del contenedor
    this.renderer.appendChild(newElement, imgElement);

    // Insertar el nuevo elemento en el contenedor principal
    this.renderer.appendChild(container, newElement);

    // Crear referencia de drag para el nuevo elemento
    const dragRef = this.dragDrop.createDrag(newElement);

    // Limitar el movimiento al contenedor
    dragRef.withBoundaryElement(container);

    this.dragRefs.push(dragRef);
  }

  saveSlideArea() {
    // Seleccionar el contenedor
    const container = this.el.nativeElement.querySelector('#example-boundary');
    console.log(container);
  }
}
