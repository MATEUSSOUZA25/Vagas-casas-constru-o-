# Casas Engenharia — Portal de Recrutamento

Formulário web de candidatura para vagas de Operador de Máquinas Pesadas e Veículos de Obra da **Casas Engenharia**, integrado ao **FormSubmit** para recebimento direto de dados e anexos por e-mail.

## Estrutura do Projeto

- `index.html`: estrutura semântica do formulário, seções de dados pessoais, contato, qualificação técnica, experiências recentes e anexos.
- `styles.css`: estilos complementares, foco acessível e identidade visual institucional.
- `app.js`: máscaras de entrada (WhatsApp, CEP e valores monetários), campos dinâmicos (dependentes e experiências), validações e envio integrado via FormSubmit.
- `README.md`: documentação do projeto e instruções de publicação.

## Funcionalidades

- **Dados Pessoais e Mobilidade**: identificação, estado civil, inclusão dinâmica de dependentes, categoria de CNH com EAR, disponibilidade para viagens e situação de passaporte.
- **Contato e Endereço**: máscara de telefone/WhatsApp, validação de e-mail e preenchimento automático de endereço via CEP.
- **Qualificação Técnica**: seleção de cargo pretendido, tempo de experiência, máquinas operadas e pretensão salarial formatada em Real (`R$`).
- **Histórico Profissional**: adição dinâmica de múltiplas experiências recentes com período e atividades.
- **Anexos e Certificações**: seleção de NRs, upload obrigatório de currículo e envio múltiplo de CNH, diplomas e certificados.

## Como Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os quatro arquivos (`index.html`, `styles.css`, `app.js` e `README.md`) para a raiz (`/`).
2. Acesse **Settings → Pages** no repositório.
3. Em **Build and deployment**, selecione a branch principal (`main`) e a pasta `/ (root)`, depois clique em **Save**.
4. Após publicar, realize um primeiro envio de teste no site para confirmar a ativação do e-mail no FormSubmit.
