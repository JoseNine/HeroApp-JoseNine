import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.loading()) {
    <div class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .loading-inline {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background-color: rgba(255, 255, 255, 0.9);
      }

      .loading-spinner {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem auto;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .loading-text {
        margin: 0;
        color: #333;
        font-size: 1rem;
      }
    `,
  ],
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
