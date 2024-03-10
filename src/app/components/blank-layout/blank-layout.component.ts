import { Component ,HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from '../nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule , NavBlankComponent ,RouterOutlet ,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {
  buttonVisible: boolean = false;

  constructor() { }

  goToUp(): void {
    const duration: number = 500; // Duration of the animation in milliseconds
    const start: number = window.scrollY;
    const end: number = 0;
    const distance: number = end - start;
    const startTime: number = performance.now();

    function easeInOutQuad(t: number, b: number, c: number, d: number): number {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animation(): void {
      const timeElapsed: number = performance.now() - startTime;
      window.scrollTo(0, easeInOutQuad(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, end);  
      }
    }

    animation();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.buttonVisible = window.scrollY > 500;   
  }


  
}