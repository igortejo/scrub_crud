import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;
import app from '../src/index.js'; // Seu servidor Express

chai.use(chaiHttp);

describe('Testes de Pedido', () => {

  it('Deve retornar todos os pedidos', (done) => {
    chai.request(app)
      .get('/pedido')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Deve criar um pedido', (done) => {
    const novoPedido = {
      descricao: 'Pedido de jaleco hospitalar',
      usuarioId: 1,
      valorTotal: 199.90
    };

    chai.request(app)
      .post('/pedido')
      .send(novoPedido)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.descricao).to.equal(novoPedido.descricao);
        expect(res.body.usuarioId).to.equal(novoPedido.usuarioId);
        expect(res.body.valorTotal).to.equal(novoPedido.valorTotal);
        done();
      });
  });

  it('Deve atualizar um pedido', (done) => {
    const pedidoAtualizado = {
      descricao: 'Pedido atualizado de jaleco e scrub',
      valorTotal: 299.90
    };

    chai.request(app)
      .put('/pedido/1') 
      .send(pedidoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.descricao).to.equal(pedidoAtualizado.descricao);
        expect(res.body.valorTotal).to.equal(pedidoAtualizado.valorTotal);
        done();
      });
  });

  it('Deve excluir um pedido', (done) => {
    chai.request(app)
      .delete('/pedido/1') 
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Pedido deletado com sucesso!');
        done();
      });
  });

});
