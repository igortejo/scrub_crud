const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/index');

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
      descricao: 'Pedido de jaleco',
      usuarioId: 1,
      valorTotal: 199.90
    };

    chai.request(app)
      .post('/pedido')
      .send(novoPedido)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.pedido.descricao).to.equal(novoPedido.descricao);
        expect(res.body.pedido.usuarioId).to.equal(novoPedido.usuarioId);
        expect(res.body.pedido.valorTotal).to.equal(novoPedido.valorTotal);
        done();
      });
  });

  it('Deve atualizar um pedido existente', (done) => {
    const pedidoAtualizado = {
      descricao: 'Pedido de jaleco',
      valorTotal: 299.90
    };

    chai.request(app)
      .put('/pedido/8') 
      .send(pedidoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.pedido.descricao).to.equal(pedidoAtualizado.descricao);
        expect(res.body.message).to.equal('Pedido atualizado com sucesso!');
        done();
      });
  });

  it('Deve tentar atualizar um pedido inexistente', (done) => {
    const pedidoAtualizado = {
      descricao: 'Pedido de jaleco',
      valorTotal: 299.90
    };

    chai.request(app)
      .put('/pedido/40') 
      .send(pedidoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Pedido não encontrado!');
        done();
      });
  });

  it('Deve excluir um pedido', (done) => {
    chai.request(app)
      .delete('/pedido/9') 
      .end((err, res) => {
        if (res.status === 200) {
          expect(res.body.message).to.equal('Pedido deletado com sucesso!');
        } else if (res.status === 404) {
          expect(res.body.message).to.equal('Pedido não encontrado!');
        } else {
          throw new Error(`Status inesperado: ${res.status}`);
        }
        done();
      });
   });
});
