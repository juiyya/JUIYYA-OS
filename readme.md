# JUIYYA-OS

### Svelte -> React

1. **Window Manager**
Criámos um estado global robusto (`WindowManager`) que sabe exatamente quem está aberto, quem tem o foco (z-index), quem está minimizado e quem foi fechado. sem passar `props` infinitas por dez ficheiros diferentes.
2. **(`BaseWindow`):**
Integramos o `react-rnd`. Agora, *qualquer* programa que você crie herda automaticamente o poder de ser arrastado, redimensionado, minimizado e fechado. injetamos o `Footer` diretamente sem ter q repetir.
3. **A Interface Base:**
Desktop` com os atalhos (esquerdos e direitos), Taskbar
4. **Migração de Aplicações:**
Traduzi **9 codigos** do Svelte para o React:
* `WelcomeTxt` e `ToDoListTxt` (Blocos de Notas)
* `Terminal` e `Lixeira`
* `ImageViewer` 
* `Folder` 
* `Browser` 
* `OSExplorer` 
* `Chat` 


5. **CSS**
CSS global original do svelte

---

### tarefas
- ALTERAR buddy-list -> OSExplorer 
- terminar migracao do front
- comecar a estruturar o java
- usar vault nas chaves
- nginx
- docker
- vm
  
seguir estes princípios:

1. **Deleção em vez de Adição:** O melhor código é aquele que não precisa ser escrito. Se podemos centralizar algo (como fizemos com o Footer e a lógica de arrastar), nós centralizamos. DRY (Don't Repeat Yourself).
2. **Isolamento de Problemas:** Primeiro a mecânica (JavaScript/React), depois a pintura (CSS). Nunca misturamos a resolução de um bug de estado com um bug de layout.
3. **Componentes "Burros" e Estado Inteligente:** Os programas (como o Bloco de Notas ou o MSN) só se devem preocupar em renderizar o conteúdo deles. A responsabilidade de saber se estão abertos ou minimizados é do `WindowManager`.
