import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { isFunction } from 'rxjs/internal/util/isFunction';


interface Inote {
  id: number;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  usuarioId: number;
  tags: string;
  lastEdit: String;
}



@Component({
  selector: 'app-notes-screen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css'
})

export class NotesScreen {

  notes: Inote[];
  notesSelecionado: Inote;
  successLogin: string;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.notes = [];
    this.notesSelecionado = null!;
    const agora = new Date();
    this.dataHora = agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();

    this.successLogin = "";
  }

  ngOnInit() {
    this.getNotes();

  }

  async getNotes() {
    let response = await firstValueFrom(this.http.get("http://localhost:3000/notas", {
      headers: {
      }
    }))

    if (response) {
      this.notes = response as [];
      console.log("Notes", this.notes);
    } else {
      console.log("Notes", response)
    }

   this.cd.detectChanges();

  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  dataHora: string = '';
  tagSelecionada = '';
  tagsDisponiveis = [
    "dev",
    "cooking",
    "work",
    "home",
  ];

  darkMode: boolean = false

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

  //Notas selecionadas

  async onNoteClick(notaClicada: Inote) {

    console.log("Nota Clicada", notaClicada)
    this.notesSelecionado = notaClicada;


    let response = await firstValueFrom(this.http.get("http://localhost:3000/notas?id=" +
      notaClicada.id, {
      headers: {
      }
    }));



  }

  //////////////////////////////////////////

  async atualizaNotes() {

    let newNotes = {
      id: this.notesSelecionado.id,
      usuarioid: this.notesSelecionado.id,
      titulo: this.notesSelecionado.titulo,
      descricao: this.notesSelecionado.descricao,
      imagem: this.notesSelecionado.imagemUrl

    };

  //  this.cd.detectChanges();

    const existe = this.notes.some(n => n.id === this.notesSelecionado.id);

    if (existe) {
      let newNoteResponse = await firstValueFrom(this.http.put("http://localhost:3000/notas/" + newNotes.id, newNotes, {
        headers: {
          "content-type": "application/json"
        },

      }));
      this.successLogin = "Nota Atualizada com sucesso!";

      await this.onNoteClick(this.notesSelecionado);

    } else {
      let newNoteEnviaResponse = await firstValueFrom(this.http.post("http://localhost:3000/notas", newNotes, {
        headers: {
          "content-type": "application/json"
        },

      }));
      this.successLogin = "Nota cadastrada com sucesso!";
      await this.onNoteClick(this.notesSelecionado);

    }


    await this.getNotes();

  }

  async createNote() {
    const novaNota: Inote = {
      id: Date.now(), // ou gere um ID temporário
      titulo: '',
      descricao: '',
      imagemUrl: '',
      usuarioId: 1, // ou o ID do usuário atual
      tags: '',
      lastEdit: this.dataHora
    };

    this.notesSelecionado = novaNota;

  }


}
