import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;
import app from '../src/index.js'; // Seu servidor Express

chai.use(chaiHttp);

describe('Testes de Produto', () => {

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
      cor: 'vermelho',
      tamanho: 'M'
    };

    chai.request(app)
      .post('/produto')
      .send(novoProduto)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.cor).to.equal(novoProduto.cor);
        expect(res.body.tamanho).to.equal(novoProduto.tamanho);
        done();
      });
  });

  it('Deve atualizar um produto', (done) => {
    const produtoAtualizado = {
      cor: 'azul',
      tamanho: 'G'
    };

    chai.request(app)
      .put('/produto/1') 
      .send(produtoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.cor).to.equal(produtoAtualizado.cor);
        expect(res.body.tamanho).to.equal(produtoAtualizado.tamanho);
        done();
      });
  });

  it('Deve excluir um produto', (done) => {
    chai.request(app)
      .delete('/produto/1') 
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Produto deletado com sucesso!');
        done();
      });
  });

});
