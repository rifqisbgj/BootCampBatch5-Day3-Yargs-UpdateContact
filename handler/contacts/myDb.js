const fs = require('fs');

module.exports = () => {
    const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
    const user = JSON.parse(rawData);
    return user;
}