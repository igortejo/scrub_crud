const { chai, expect, app, db } = require('./setup');

describe('Testes de Produto', () => {
  let produtoId;

  // Hook para limpar o banco de dados antes de cada teste
  beforeEach(async () => {
    await db.models.Produto.destroy({ where: {} });
  });

  // 3.1. Criar Produto
  it('Deve criar um produto com dados válidos', async () => {
    const res = await chai.request(app)
      .post('/produtos')
      .send({
        nome: 'Pijama Hospitalar',
        preco: 89.90,
        tamanho: 'M',
        cor: 'azul',
        estoque: 50
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body.nome).to.equal('Pijama Hospitalar');
    expect(res.body.preco).to.equal(89.90);

    // Verifica se o produto foi salvo no banco de dados
    const produto = await db.models.Produto.findOne({ where: { nome: 'Pijama Hospitalar' } });
    expect(produto).to.not.be.null;
    expect(produto.estoque).to.equal(50);
  });

  // 3.2. Tentativa de Criação de Produto com Dados Inválidos
  it('Deve retornar erro ao tentar criar produto com dados inválidos', async () => {
    const res = await chai.request(app)
      .post('/produtos')
      .send({
        nome: '',
        preco: -10,
        tamanho: '',
        cor: '',
        estoque: -5
      });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('mensagem', 'Dados inválidos');
  });

  // 3.3. Obter Produto
  it('Deve retornar os dados do produto', async () => {
    // Cria um produto para teste
    const produto = await db.models.Produto.create({
      nome: 'Pijama Hospitalar',
      preco: 89.90,
      tamanho: 'M',
      cor: 'azul',
      estoque: 50
    });
    produtoId = produto.id;

    const res = await chai.request(app)
      .get(`/produtos/${produtoId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id', produtoId);
    expect(res.body).to.have.property('nome', 'Pijama Hospitalar');
    expect(res.body).to.have.property('preco', 89.90);
    expect(res.body).to.have.property('estoque', 50);
  });

  // 3.4. Atualizar Produto
  it('Deve atualizar os dados do produto', async () => {
    // Cria um produto para teste
    const produto = await db.models.Produto.create({
      nome: 'Pijama Hospitalar',
      preco: 89.90,
      tamanho: 'M',
      cor: 'azul',
      estoque: 50
    });
    produtoId = produto.id;

    const res = await chai.request(app)
      .put(`/produtos/${produtoId}`)
      .send({
        preco: 99.90,
        estoque: 40
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('preco', 99.90);
    expect(res.body).to.have.property('estoque', 40);
  });

  // 3.5. Excluir Produto
  it('Deve excluir o produto', async () => {
    // Cria um produto para teste
    const produto = await db.models.Produto.create({
      nome: 'Pijama Hospitalar',
      preco: 89.90,
      tamanho: 'M',
      cor: 'azul',
      estoque: 50
    });
    produtoId = produto.id;

    const res = await chai.request(app)
      .delete(`/produtos/${produtoId}`);

    expect(res).to.have.status(204);

    // Verifica se o produto foi excluído do banco de dados
    const produtoExcluido = await db.models.Produto.findByPk(produtoId);
    expect(produtoExcluido).to.be.null;
  });
});