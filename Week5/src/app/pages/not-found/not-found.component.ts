import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found-page animate-fade-in">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <a routerLink="/" class="btn-home">← Go Home</a>
    </div>
  `,
  styles: [`
    .not-found-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      gap: 1.25rem;
      padding: 2rem;
    }
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }
    h1 { font-size: 2rem; color: #fff; }
    p { color: rgba(255,255,255,0.6); max-width: 400px; }
    .btn-home {
      margin-top: 1rem;
      padding: 0.75rem 1.75rem;
      background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
      color: #1a1a24;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .btn-home:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(161,196,253,0.35); }
    @keyframes fadeIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  `]
})
export class NotFoundComponent {}
