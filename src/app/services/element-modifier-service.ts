import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la app
})
export class ElementModifierService {
  modifyElement(element: HTMLElement): HTMLElement {
    // Conservar los estilos y las clases
    const originalTransform = element.style.transform; // Guardamos el transform original

    // Eliminar todos los atributos que no sean el estilo y el 'delete-icon'
    Array.from(element.attributes).forEach((attr) => {
      if (
        !['style', 'class'].includes(attr.name) &&
        !attr.name.startsWith('_ngcontent') &&
        attr.name !== 'transform'
      ) {
        element.removeAttribute(attr.name);
      }
    });

    // Restaurar el 'transform'
    element.style.transform = originalTransform;

    return element;
  }
}
