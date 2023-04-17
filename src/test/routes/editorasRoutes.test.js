/* eslint-disable linebreak-style */
import {
  afterEach, beforeEach, describe, expect, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;

beforeEach(() => {
  const port = 3000;

  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

let idResposta;

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

describe('GET em /editoras/id', () => {
  it('deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('POST em /editoras', () => {
  it('Deve adicioniar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CdC',
        cidade: 'Sao Paulo',
        email: 'c@c.com',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

// eslint-disable-next-line max-len
// test.each requer um array de objetos com a chave e valor para testar múltiplos campos de uma só vez.

describe('PUT em /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Casa do Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/id', () => {
  it('deve deletar recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
