const fs = require('fs');

module.exports = (name) => {
    const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
    const user = JSON.parse(rawData);

    // mencari nilai index dari nama yang diinputkan
    const indexData = user.findIndex(x => x.name.toLowerCase() === name.toLowerCase());
    if (indexData == -1) {
        console.log("Data tidak tersedia");
        return false;
    }
    if (indexData > -1) {
        user.splice(indexData, 1); // menghapus dimulai dari nilai index dan menghapus 1 index yaitu index tersebut
    }

    fs.writeFileSync('./data/contacts.json', JSON.stringify(user));
    console.log(`Hapus data ${name} berhasil`);
}