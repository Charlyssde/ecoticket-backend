const {db, storage} = require("../firebase");
exports.saveFile = async (finalName, buffer) => {
    return storage.file(finalName).createWriteStream().end(buffer);
}
exports.getUrlFile = async (name) => {
    const descarga =  await storage.file(name);
    return await descarga.getSignedUrl({action: 'read', expires: Date.now() + 1000 * 60 * 10});
}