const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/index');

chai.use(chaiHttp);

describe('Testes de Usuário', function () {

  it('Deve retornar todos os usuários', (done) => {
    chai.request(app) //Inicia uma requisição HTTP para o servidor app.
      .get('/usuario')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Deve criar um usuário novo', (done) => {
    const novoUsuario = {
      nome: 'igor',
      email: 'igortejo@gmail.com',
      idade: 22,
      senha: 'senha123'
    };
    chai.request(app)
      .post('/usuario')
      .send(novoUsuario)
      .end((err, res) => {
        if(res.status === 201) {
          expect(res.body.usuario.nome).to.equal(novoUsuario.nome); //esse usuario é o que vem no body do back
          expect(res.body.message).to.equal("Usuário criado com sucesso!");
        } else if(res.status === 400) {  //se o email ja existir
          expect(res.body.message).to.equal("E-mail já cadastrado!");
        } else {
          throw new Error(`Status inesperado: ${res.status}`);
        }
        done();
      });
  });

  it('Deve atualizar um usuário existente', (done) => {
    const usuarioAtualizado = {
      nome: 'Vikjhiuhgdfa25lves',
      email: 'vikalves@gmail.com'
    };

    chai.request(app)
      .put('/usuario/76')  
      .send(usuarioAtualizado)
      .end((err, res) => {
        if(res.status === 200) {
          expect(res.body.usuario.nome).to.equal(usuarioAtualizado.nome);
          expect(res.body.usuario.email).to.equal(usuarioAtualizado.email);
          expect(res.body.message).to.equal("Usuário atualizado com sucesso!");
        } else if (res.status === 404) {  //quando o usuário não existe
          expect(res.body.message).to.equal("Usuário não encontrado!");
        } else {
          throw new Error(`Status inesperado: ${res.status}`);
        }
        done();
      });
  });

  it('Deve tentar atualizar um usuário inexistente', (done) => {
    const usuarioAtualizado = {
      nome: 'Vikjhiuhgdfa25lves',
      email: 'vikalves@gmail.com'
    };

    chai.request(app)
      .put('/usuario/99')  
      .send(usuarioAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Usuário não encontrado!");

        done();
      });
  });

  it('Deve excluir um usuário', (done) => {
    chai.request(app)
      .delete('/usuario/76')  
      .end((err, res) => {
        if (res.status === 200) {
          expect(res.body.message).to.equal('Usuário deletado com sucesso!');
        } else if (res.status === 404) {  //usuário não for encontrado
          expect(res.body.message).to.equal('Usuário não encontrado!');
        } else {
          throw new Error(`Status inesperado: ${res.status}`);
        }
        done();
      });
  });
});
