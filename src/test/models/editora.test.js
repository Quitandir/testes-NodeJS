/* eslint-disable linebreak-style */
import { describe, expect, jest } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'CdC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);
    // verifica se instância teste bate com o objeto modelo.
    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it.skip('Deve salvar editora no banco', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CdC');
    });
  });

  it.skip('Deve salvar no banco usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();

    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  // A fim de evitar interação real com o banco de dados, é possível simular os métodos usando
  // uma ferramenta do jest.

  it('Deve fazer uma chamada simulada ao banco', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CdC',
      cidade: 'Sao Paulo',
      email: 'c@c.com',
      created_at: '2023-04-07',
      updated_at: '2023-04-07',
    });

    const retorno = editora.salvar();

    // expect(retorno).toEqual(expect.objectContaining({chaves})) - usado para comparar objetos.

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
