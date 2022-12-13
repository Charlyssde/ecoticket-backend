const {Router} = require('express')
const {getStore, getStorebyId, getSaveStore, getPutStore, getdeleteStore} = require("../controllers/store");
const store = Router();

store.get('/store/all/:id',  getStore);
store.get('/store/:id', getStorebyId);
store.post('/store/', getSaveStore);
store.put('/store/:id',getPutStore);
store.delete('/store/:id', getdeleteStore);

module.exports = store;