import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlideBaseComponent } from './components-tests/slide-base/slide-base.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlideBaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-experiments';
}
