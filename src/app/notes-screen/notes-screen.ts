import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes-screen',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css'
})
export class NotesScreen {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dataHora: string = '';

  constructor() {
    const agora = new Date();
    this.dataHora = agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const telaBanner = document.querySelector('.tela-banner') as HTMLElement;
        telaBanner.style.backgroundImage = `url('${reader.result}')`;
        telaBanner.style.backgroundSize = 'cover';
        telaBanner.style.backgroundPosition = 'center';
        // telaBanner.innerHTML = '';
      };

      reader.readAsDataURL(file);
    }
  }
}
