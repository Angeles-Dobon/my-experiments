import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slide-base',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './slide-base.component.html',
  styleUrl: './slide-base.component.scss',
})
export class SlideBaseComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
  }
}
