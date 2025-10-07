import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isFunction } from 'rxjs/internal/util/isFunction';

@Component({
  selector: 'app-notes-screen',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css'
})
export class NotesScreen {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dataHora: string = '';
tagSelecionada ='';
  tagsDisponiveis =[
    "dev",
    "cooking",
    "work",
    "home",
  ];

  darkMode: boolean = false

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
        telaBanner.innerHTML = '';
      };

      reader.readAsDataURL(file);
    }
  }
  async salvarNotas(): Promise<void>{
    if(!this.salvarNotas){
      return;
    }
  }
  deslogar(){
  //1 alternativa
  localStorage.removeItem("meuToken");
  localStorage.removeItem("meuId");

  localStorage.clear();
  window.location.href = "LOgin";
}

ligarDesligarDarkMode(){

  this.darkMode = !this.darkMode; //o inverso do this.darkMode

  
  document.body.classList.toggle("dark-mode", this.darkMode);

  localStorage.setItem("darkMode", this.darkMode.toString());
}
}

