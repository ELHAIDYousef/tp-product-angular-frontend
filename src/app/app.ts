import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // Required for the HTML tags above[cite: 2]
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { }