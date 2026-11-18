# Casas Engenharia — formulário demonstrativo

Projeto de portfólio de um formulário de candidatura para uma empresa fictícia chamada **Casas Engenharia**. A identidade visual é original e serve apenas como exemplo; não representa nem reproduz oficialmente a marca de qualquer empresa.

## Arquivos
- `index.html`: estrutura do formulário.
- `styles.css`: estilos complementares.
- `app.js`: interações, validações, campos dinâmicos e simulação de envio.

## Executar localmente
Abra `index.html` no navegador ou utilize a extensão Live Server no VS Code.

## Publicar no GitHub Pages
Envie os três arquivos para a raiz do repositório. Em Settings → Pages, selecione a branch e a pasta `/ (root)`. O `index.html` será a página inicial.

## Privacidade da demonstração
- Esta versão é fixa em modo demonstração: não envia candidaturas e não salva dados.
- O CEP é apenas formatado no navegador. Não existe consulta ViaCEP, nem chamada de rede para localizar endereço. Rua, bairro e cidade devem ser preenchidos manualmente.
- Não utilize dados pessoais reais ao testar ou apresentar o projeto.
- Os anexos selecionados permanecem apenas no navegador e não são transmitidos.

## Dependências externas
O layout atual utiliza Tailwind CSS via CDN para manter as classes de estilo existentes. As fontes são nativas do sistema operacional e os ícones foram substituídos por elementos locais, sem Google Fonts ou Font Awesome. Para funcionamento totalmente offline, será necessário incorporar Tailwind localmente ou substituir as classes por CSS próprio.

## Próxima evolução
A versão de produção deve ser implementada separadamente, com backend, autenticação, banco de dados, armazenamento privado de documentos e controles de acesso. Não reutilize esta demonstração para receber candidaturas reais.
