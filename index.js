import express from "express";

const host = "0.0.0.0";
const port = 3000;
const app = express();
const listaAluno = [];

app.use(express.urlencoded({ extended: true }));

app.get("/cadastroaluno", (req, res) => {
  res.send(`
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Cadastro de Aluno</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .caixa-formulario {
      background-color: #f9f9f9;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 450px;
      animation: aparecer 0.8s ease forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    @keyframes aparecer {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .caixa-formulario h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #333;
    }
    .campo {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }
    .campo label {
      margin-bottom: 6px;
      color: #555;
      font-size: 15px;
      font-weight: 500;
    }
    .campo input,
    .campo select {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s ease;
    }
    .campo input:focus,
    .campo select:focus {
      border-color: #4fa1d6;
      outline: none;
      box-shadow: 0 0 5px rgba(79, 161, 214, 0.3);
    }
    .botao-enviar {
      width: 100%;
      padding: 12px;
      background-color: #4fa1d6;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .botao-enviar:hover {
      background-color: #3b8dbf;
    }
    .rodape {
      text-align: center;
      margin-top: 20px;
      color: #777;
      font-size: 14px;
    }
    .rodape a {
      color: #4fa1d6;
      text-decoration: none;
    }
    .rodape a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="caixa-formulario">
    <h2>Cadastro de Aluno</h2>
    <form action="/cadastroaluno" method="POST">
      <div class="campo">
        <label for="nome">Nome completo</label>
        <input type="text" id="nome" name="nome" required />
      </div>
      <div class="campo">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="campo">
        <label for="telefone">Telefone</label>
        <input type="tel" id="telefone" name="telefone" required />
      </div>
      <div class="campo">
        <label for="curso">Curso</label>
        <select id="curso" name="curso" required>
          <option value="">Selecione o curso</option>
          <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
          <option value="Engenharia Civil">Engenharia Civil</option>
          <option value="Enfermagem">Enfermagem</option>
          <option value="Direito">Direito</option>
        </select>
      </div>
      <div class="campo">
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" required />
      </div>
      <div class="campo">
        <input type="submit" value="Cadastrar" class="botao-enviar" />
      </div>
    </form>
    <div class="rodape">
      <a href="/alunos">Ver alunos cadastrados</a>
    </div>
  </div>
</body>
</html>
  `);
  res.end();
});

app.post("/cadastroaluno", (req, res) => {
  const { nome, email, telefone, curso, senha } = req.body;

  listaAluno.push({ nome, email, telefone, curso });

  res.redirect("/alunos");
});

app.get("/alunos", (req, res) => {
  let listaHTML = "";
  if (listaAluno.length === 0) {
    listaHTML = `<p>Nenhum aluno cadastrado ainda.</p>`;
  } else {
    listaAluno.forEach((aluno) => {
      listaHTML += `
        <li>
          <strong>Nome:</strong> ${aluno.nome}<br />
          <strong>Email:</strong> ${aluno.email}<br />
          <strong>Telefone:</strong> ${aluno.telefone}<br />
          <strong>Curso:</strong> ${aluno.curso}
        </li>
        <hr />
      `;
    });
  }

  res.send(`
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Alunos Cadastrados</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding: 40px 0;
    }
    .caixa-lista {
      background-color: #f9f9f9;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
      animation: aparecer 0.8s ease forwards;
      opacity: 0;
      transform: translateY(30px);
    }
    @keyframes aparecer {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #333;
    }
    ul {
      list-style-type: none;
    }
    li {
      margin-bottom: 20px;
      color: #555;
      font-size: 16px;
    }
    hr {
      border: 0;
      height: 1px;
      background: #ddd;
      margin: 10px 0;
    }
    .botao-voltar {
      display: block;
      width: 150px;
      margin: 20px auto 0;
      padding: 12px;
      background-color: #4fa1d6;
      color: white;
      text-align: center;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s ease;
    }
    .botao-voltar:hover {
      background-color: #3b8dbf;
    }
  </style>
</head>
<body>
  <div class="caixa-lista">
    <h2>Lista de Alunos Cadastrados</h2>
    <ul>
      ${listaHTML}
    </ul>
    <a href="/cadastroaluno" class="botao-voltar">Voltar ao cadastro</a>
  </div>
</body>
</html>
  `);
   res.end();
});

app.listen(port, host, () => {
  console.log(`Servidor em execução em http://${host}:${port}/`);
});
