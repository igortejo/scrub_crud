const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/index');


chai.use(chaiHttp);

describe('Testes de Produto', function () {

  it('Deve retornar todos os produtos', (done) => {
    chai.request(app)
      .get('/produto')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Deve criar um produto', (done) => {
    const novoProduto = {
      cor: 'marrom',
      tamanho: 'M'
    };

    chai.request(app)
      .post('/produto')
      .send(novoProduto)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.produto.cor).to.equal(novoProduto.cor);
        expect(res.body.produto.tamanho).to.equal(novoProduto.tamanho);
        done();
      });
  });

  it('Deve atualizar um produto existente', (done) => {
    const produtoAtualizado = {
      cor: 'azuuppul',
      tamanho: 'G'
    };

    chai.request(app)
      .put('/produto/4') 
      .send(produtoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.produto.cor).to.equal(produtoAtualizado.cor);
        expect(res.body.produto.tamanho).to.equal(produtoAtualizado.tamanho);
        expect(res.body.message).to.equal("Produto atualizado com sucesso!");
        done();
      });
  });

  it('Deve tentar atualizar um produto inexistente', (done) => {
    const produtoAtualizado = {
      cor: 'azuup0pul',
      tamanho: 'G'
    };

    chai.request(app)
      .put('/produto/44') 
      .send(produtoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Produto não encontrado!");
        done();
      });
  });

  it('Deve excluir um produto', (done) => {
    chai.request(app)
      .delete('/produto/8') 
      .end((err, res) => {
        if (res.status === 200) {
          expect(res.body.message).to.equal('Produto deletado com sucesso!');
        } else if (res.status === 404) {
          expect(res.body.message).to.equal('Produto não encontrado!');
        } else {
          throw new Error(`Status inesperado: ${res.status}`);
        }
        done();
      });
  });
});
