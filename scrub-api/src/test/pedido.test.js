const { chai, expect, app, db } = require('./setup');

describe('Testes de Pedido', () => {
  let pedidoId;
  let produtoId1, produtoId2;

  // Hook para limpar o banco de dados antes de cada teste
  beforeEach(async () => {
    await db.models.Pedido.destroy({ where: {} });
    await db.models.Produto.destroy({ where: {} });
  });

  // Cria produtos para teste
  before(async () => {
    const produto1 = await db.models.Produto.create({
      nome: 'Pijama Hospitalar',
      preco: 89.90,
      tamanho: 'M',
      cor: 'azul',
      estoque: 50
    });
    produtoId1 = produto1.id;

    const produto2 = await db.models.Produto.create({
      nome: 'Jaleco',
      preco: 120.00,
      tamanho: 'G',
      cor: 'branco',
      estoque: 30
    });
    produtoId2 = produto2.id;
  });

  // 4.1. Tentativa de Criação de Pedido com Dados Inválidos
  it('Deve retornar erro ao tentar criar pedido com produto inexistente', async () => {
    const res = await chai.request(app)
      .post('/pedidos')
      .send({
        produtos: [
          { id: 999, quantidade: 2 } // Produto inexistente
        ]
      });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('mensagem', 'Produto não encontrado');
  });

  // 4.2. Criar Pedido com Dados Válidos
  it('Deve criar um pedido com dados válidos', async () => {
    const res = await chai.request(app)
      .post('/pedidos')
      .send({
        produtos: [
          { id: produtoId1, quantidade: 1 },
          { id: produtoId2, quantidade: 2 }
        ]
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('total', 329.90); // (89.90 * 1) + (120.00 * 2)

    // Verifica se o pedido foi salvo no banco de dados
    const pedido = await db.models.Pedido.findByPk(res.body.id, {
      include: db.models.Produto
    });
    expect(pedido).to.not.be.null;
    expect(pedido.produtos.length).to.equal(2);
  });

  // 4.3. Obter Pedido
  it('Deve retornar os dados do pedido', async () => {
    // Cria um pedido para teste
    const pedido = await db.models.Pedido.create({
      total: 329.90
    });
    await pedido.addProdutos([
      { id: produtoId1, quantidade: 1 },
      { id: produtoId2, quantidade: 2 }
    ]);
    pedidoId = pedido.id;

    const res = await chai.request(app)
      .get(`/pedidos/${pedidoId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('id', pedidoId);
    expect(res.body).to.have.property('total', 329.90);
    expect(res.body.produtos.length).to.equal(2);
  });

  // 4.4. Atualizar Pedido
  it('Deve atualizar o status do pedido', async () => {
    // Cria um pedido para teste
    const pedido = await db.models.Pedido.create({
      total: 329.90,
      status: 'processando'
    });
    pedidoId = pedido.id;

    const res = await chai.request(app)
      .put(`/pedidos/${pedidoId}`)
      .send({
        status: 'entregue'
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status', 'entregue');
  });

  // 4.5. Excluir Pedido
  it('Deve excluir o pedido', async () => {
    // Cria um pedido para teste
    const pedido = await db.models.Pedido.create({
      total: 329.90
    });
    pedidoId = pedido.id;

    const res = await chai.request(app)
      .delete(`/pedidos/${pedidoId}`);

    expect(res).to.have.status(204);

    // Verifica se o pedido foi excluído do banco de dados
    const pedidoExcluido = await db.models.Pedido.findByPk(pedidoId);
    expect(pedidoExcluido).to.be.null;
  });
});