const { chai, expect, app, db } = require('./setup');

describe('Testes de Usuário', () => {
  let usuarioId;

  // Hook para limpar o banco de dados antes de cada teste
  beforeEach(async () => {
    await db.models.Usuario.destroy({ where: {} });
  });

  // 2.1. Login com Credenciais Inválidas (Usuário Não Existe)
  it('Deve retornar erro ao tentar login com credenciais inválidas', async () => {
    const res = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'naoexiste@teste.com',
        senha: 'senha123'
      });

    expect(res).to.have.status(401);
    expect(res.body).to.have.property('mensagem', 'Credenciais inválidas');
  });

  // 2.2. Login com Credenciais Válidas (Usuário Existe)
  it('Deve retornar token ao fazer login com credenciais válidas', async () => {
    // Cria um usuário para teste
    await db.models.Usuario.create({
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'Senha@123',
      tipo: 'cliente'
    });

    const res = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'maria@teste.com',
        senha: 'Senha@123'
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  // 2.3. Login com Campos em Branco
  it('Deve retornar erro ao tentar login com campos em branco', async () => {
    const res = await chai.request(app)
      .post('/auth/login')
      .send({
        email: '',
        senha: ''
      });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('mensagem', 'Preencha todos os campos');
  });

  // 2.4. Criar Usuário com Sucesso (Gerente)
  it('Deve criar um usuário gerente com sucesso', async () => {
    const res = await chai.request(app)
      .post('/usuarios')
      .send({
        nome: 'Gerente',
        email: 'gerente@teste.com',
        senha: 'Senha@123',
        tipo: 'gerente'
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body.tipo).to.equal('gerente');
  });

  // 2.5. Tentativa de Criação de Usuário com Email Já Existente
  it('Deve retornar erro ao tentar criar usuário com email duplicado', async () => {
    // Cria um usuário para teste
    await db.models.Usuario.create({
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'Senha@123',
      tipo: 'cliente'
    });

    const res = await chai.request(app)
      .post('/usuarios')
      .send({
        nome: 'Maria',
        email: 'maria@teste.com',
        senha: 'Senha@123',
        tipo: 'cliente'
      });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('mensagem', 'Email já cadastrado');
  });

  // 2.6. Tentativa de Criação de Usuário com Dados Inválidos
  it('Deve retornar erro ao tentar criar usuário com dados inválidos', async () => {
    const res = await chai.request(app)
      .post('/usuarios')
      .send({
        nome: '',
        email: 'emailinvalido',
        senha: '123',
        tipo: 'cliente'
      });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('mensagem', 'Dados inválidos');
  });

  // 2.7. Obter Usuário
  it('Deve retornar os dados do usuário', async () => {
    // Cria um usuário para teste
    const usuario = await db.models.Usuario.create({
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'Senha@123',
      tipo: 'cliente'
    });
    usuarioId = usuario.id;

    const res = await chai.request(app)
      .get(`/usuarios/${usuarioId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id', usuarioId);
    expect(res.body).to.have.property('nome', 'Maria');
    expect(res.body).to.have.property('email', 'maria@teste.com');
  });

  // 2.8. Atualizar Usuário
  it('Deve atualizar os dados do usuário', async () => {
    // Cria um usuário para teste
    const usuario = await db.models.Usuario.create({
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'Senha@123',
      tipo: 'cliente'
    });
    usuarioId = usuario.id;

    const res = await chai.request(app)
      .put(`/usuarios/${usuarioId}`)
      .send({
        nome: 'Maria Silva',
        senha: 'NovaSenha@123'
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nome', 'Maria Silva');
  });

  // 2.9. Excluir Usuário
  it('Deve excluir o usuário', async () => {
    // Cria um usuário para teste
    const usuario = await db.models.Usuario.create({
      nome: 'Maria',
      email: 'maria@teste.com',
      senha: 'Senha@123',
      tipo: 'cliente'
    });
    usuarioId = usuario.id;

    const res = await chai.request(app)
      .delete(`/usuarios/${usuarioId}`);

    expect(res).to.have.status(204);

    // Verifica se o usuário foi excluído do banco de dados
    const usuarioExcluido = await db.models.Usuario.findByPk(usuarioId);
    expect(usuarioExcluido).to.be.null;
  });
});