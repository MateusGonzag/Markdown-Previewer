import { useState } from "react";
import "../styles/App.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Prism from "prismjs";

const placeholder = `# Bem-vindo ao meu React Markdown Previewer!

## Este é um subtítulo...
### E aqui estão outras coisas legais:

Aqui está algum código, \`<div></div>\`, entre 2 acentos graves.

\`\`\`
// este é o código de várias linhas:

function outroExemplo(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

Você também pode deixar o texto **negrito**... uau!
Ou _itálico_.
Ou... espere... **_ambos!_**
E sinta-se livre para enlouquecer ~~travessando coisas~~.

Há também [links](https://www.freecodecamp.org), e
> Cotações de bloco!

E se você quiser ficar muito louco, até tabelas:

Cabeçalho selvagem | Cabeçalho louco | Outro cabeçalho?
------------ | ------------- | -------------
Seu conteúdo pode | estar aqui, e | pode estar aqui....
E aqui. | OK. | Acho que entendemos.

- E claro que existem listas.
  - Alguns são marcados.
     - Com diferentes níveis de recuo.
        - Isso se parece com isso.


1. E também há listas numeradas.
1. Use apenas 1s se quiser!
1. E por último, mas não menos importante, não vamos esquecer as imagens incorporadas:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

function App() {
  const [preview, setPreview] = useState({
    input: placeholder,
  });

  const inputAtualizado = (event) => {
    setPreview({
      input: event.target.value,
    });
  }

  return (
    <div className="wrapperMain">
      <p className="title">Markdown Previewer:</p>
      <div id="wrapper">
        <div className="editorWrapper">
          <p className="textEditor">Editor:</p>
          <textarea
            id="editor"
            onChange={inputAtualizado}
            type="text"
            value={preview.input}
          ></textarea>
        </div>
        <div className="previewWrapper">
          <p className="textPreview">Preview:</p>
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked.parse(preview.input, { renderer: renderer })
              ),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
