import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { isFunction } from 'rxjs/internal/util/isFunction';


interface Inote {
  noteId: number;
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
  imports: [CommonModule, ReactiveFormsModule,RouterModule,FormsModule],
  templateUrl: './notes-screen.html',
  styleUrl: './notes-screen.css'
})

export class NotesScreen {

  notes: Inote[];
  notesSelecionado: Inote;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
    this.notes = [];
    this.notesSelecionado = null!;
    const agora = new Date();
    this.dataHora = agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();

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
tagSelecionada ='';
  tagsDisponiveis =[
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


    let response = await firstValueFrom(this.http.get("http://localhost:3000/notas?noteId=" +
      notaClicada.noteId, {
      headers: {
      }
    }));

    this.cd.detectChanges();

  }

//////////////////////////////////////////

  async sendNotes() {

    let newNotes = {
      noteId: this.notesSelecionado.noteId,
      usuarioId: localStorage.getItem("meuId"),
      titulo: this.notesSelecionado.titulo,
      descricao: this.notesSelecionado.descricao

    };


    let newNoteResponse = await firstValueFrom(this.http.put("http://localhost:3000/notas/" + newNotes.noteId, newNotes, {
      headers: {
        "content-type": "application/json"
      },

    }));

    await this.onNoteClick(this.notesSelecionado);

    //enviar mensagem para a IA responder.

    // let respostaIAResponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    //   "contents": [
    //     {
    //       "parts": [
    //         {
    //           "text": this.userMessage.value +". Me de uma resposta objetiva"
    //         }
    //       ]

    //     }
    //   ]
    // },{
    //   headers:{
    //     "content-type":"application;json",
    //     "x-goog-api-key":"AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
    //   }
    // })) as any;

    // let newAnswerIA = {
    //   chatId: this.chatSelecionado.id,
    //   userId: "chatbot",
    //   text: respostaIAResponse.candidates[0].content.parts[0].text
    // }


    // let newMessageIAResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", newAnswerIA, {
    //   headers: {
    //     "content-type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem("meuToken")
    //   },

    // }));
    //       await this.onChatClick(this.chatSelecionado);

    //       this.userMessage.setValue("");
  }


  //guilherme
//    async salvarNotas(): Promise<void>{
//     if(!this.salvarNotas){
//       return;
//     }
//   }
//   deslogar(){
//   //1 alternativa
//   localStorage.removeItem("meuToken");
//   localStorage.removeItem("meuId");

//   localStorage.clear();
//   window.location.href = "LOgin";
// }

// ligarDesligarDarkMode(){

//   this.darkMode = !this.darkMode; //o inverso do this.darkMode

  
//   document.body.classList.toggle("dark-mode", this.darkMode);

//   localStorage.setItem("darkMode", this.darkMode.toString());
// }

}
