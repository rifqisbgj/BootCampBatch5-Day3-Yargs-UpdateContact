const fs = require('fs');

module.exports = (name) => {
    const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
    const user = JSON.parse(rawData);

    const cekPk = user.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (cekPk) {
        return cekPk;
    }
}