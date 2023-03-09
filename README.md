# APP DgGrupos

Bem-vindos ao repositório do App DgGrupos!

Este projeto é um app de mensagem instantânea.

<div>

<img src="https://user-images.githubusercontent.com/98930710/224115144-a417c043-5484-4639-9a41-095ce3c02ede.png" width="600px" alt="Capa do Projeto"/>

</div>
<br/>

## Sobre o projeto

O projeto foi construido com React Native CLI e utilizado Firebase para autenticaçao e banco de dados. O usuário tem acesso parcial ao aplicativo sem necessidade de realizar o Login, mas para poder interagir com as conversas e criar grupos é necessário o registro no app.


O App conta com as seguintes Screens:

- Grupos
- Entrar/Cadastro
- Mensagens
- Busca

### Grupos (Home/ChatList)

Na tela de Grupos consegue visualizar a lista de chats criados no app, o user pode acessar sem a necessidade de cadastro, porém ele não pode interagir com as pessoas nos Chats ou criar novos salas de bate-papo. Quando o mesmo tenta acessar alguma sala ou criar a sua própria sala, ele é redirecionado a tela de Login/Signin.

<div>
  <div>
    <div>
      <strong>Tela grupos sem o user realizar o login</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224117860-fc1cada5-f2b3-44bc-ad96-d8adac72e35b.png" width="400px" alt="tela Grupos sem Login"/>
  </div>
  <br/>
  <div>
    <div>
      <strong>Tela grupos com login efetuado</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224118643-3e277083-da1b-4491-bfef-9f870122001e.png" width="400px" alt="tela Grupos com user logado"/>
    <div>
      <span>Botão para realizar o logout no canto superior esquerdo da página</span>
    </div>
  </div>
  <br/>
  <div>
    <div>
      <strong>Criando um novo grupo/chat</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224127465-fdf367c2-ba96-4336-a0c4-57f2e932f274.png" width="400px" alt="criando um grupo"/>
    <img src="https://user-images.githubusercontent.com/98930710/224127991-69483f93-f3f2-45dd-b3d4-112d3bf6483c.png" width="400px" alt="usuário com limite de grupos atingido"/>
    <div>
      <span>Apenas usuários logados podem criar grupos apertando no botão com o '+' no canto inferior direito, com quantidade limitada de grupos criados por user.</span>
    </div>
  </div>
  <br/>
  <div>
    <div>
      <strong>Tela grupos com um chat pressionado por um certo periodo</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224126290-41eb771d-7e16-454d-956b-dd25ed6482cb.png" width="400px" alt="deletando um grupo existente"/>
    <div>
      <span>Com a verificação no firebase, apenas o usuário que criou o grupo poderá excluí-lo.</span>
    </div>
  </div>
</div>
<br/>

### Entrar/Cadastro (Login/Signin)

Ao tentar interagir com as features do app o user é direcionado para a tela de Login com o link para se cadastrar se ainda nao possuir uma conta. Após realizar o login ou cadastro o user é redirecionado a 'home' do app.

<br/>
<div>
  <div>
    <div>
      <strong>Tela de login/entrar</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224120360-e6f0c749-022c-4dc3-b4af-7ab95507cbc7.png" width="400px" alt="tela login do app"/>
  </div>
  <br/>
  <div>
    <div>
      <strong>Tela de signin/cadastro</strong>
    </div>
    <img src="https://user-images.githubusercontent.com/98930710/224120378-72a12cf2-8459-482b-8a00-90df273d7d5d.png" width="400px" alt="tela signin do app"/>
  </div>
</div>

### Mensagens (Messages)

A tela mensagens é acessada quando o user toca sobre algum chat existente na lista da tela grupos. Essa tela mostra o chat em tempo real e só pode ser acessada por um user logado.
<br/>
<div>
  <img src="https://user-images.githubusercontent.com/98930710/224123716-7316b83e-6e44-4b90-b62f-53234f033ead.png" width="400px" alt="tela messages do app"/>
</div>


### Busca (Search)

Tela onde o usuário pode buscar por algum chat e ver se existe algum com um nome específico.

<div>
  <div>
    <strong>busca para React</strong>
  </div>
  <img src="https://user-images.githubusercontent.com/98930710/224125145-44d92926-a178-4d89-be48-ed57088ca1b1.png" width="400px" alt="tela de Search do app"/>
</div>




## Projeto funcional.

- Com oportunidades para upgrades futuros, aguarde...
