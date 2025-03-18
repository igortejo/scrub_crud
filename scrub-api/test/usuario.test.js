import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;
import app from '../src/index.js';

chai.use(chaiHttp);

describe('Testes de Usuário', () => {

  it('Deve retornar todos os usuários', (done) => {
    chai.request(app) //Inicia uma requisição HTTP para o servidor app.
      .get('/usuario')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Deve criar um usuário', (done) => {
    const novoUsuario = {
      nome: 'igor',
      email: 'igor@gmail.com',
      idade: 22,
      senha: 'senha123'
    };

    chai.request(app)
      .post('/usuario')
      .send(novoUsuario)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.nome).to.equal(novoUsuario.nome);
        done();
      });
  });

  it('Deve atualizar um usuário', (done) => {
    const usuarioAtualizado = {
      nome: 'Vik alves',
      email: 'vikalves@gmail.com'
    };

    chai.request(app)
      .put('/usuario/1')  
      .send(usuarioAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.nome).to.equal(usuarioAtualizado.nome);
        expect(res.body.email).to.equal(usuarioAtualizado.email);
        done();
      });
  });

  it('Deve excluir um usuário', (done) => {
    chai.request(app)
      .delete('/usuario/1')  
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Usuário deletado com sucesso!');
        done();
      });
  });

});
