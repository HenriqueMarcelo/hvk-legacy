import Dexie from 'dexie';

// Código para testes e não ficar sujando o cel
// Dexie.delete('BancoDeDados');

const db = new Dexie('BancoDeDados');
db.version(1).stores({
    abastecimento: "++id, data, combustivel, nome, bandeira, hodometro, completoInt, quantidade, valorLitro, valorTotal"
});

export default db;
