const fs = require('fs');
module.exports = () => {
    const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
    const user = JSON.parse(rawData);

    console.log("Contact List: ");
    if (user.length > 0) {
        user.forEach((data, i) => {
            console.log(no + ". " + data.name + " - " + data.mobile);
            no++;
        });
    }

    if (!user.length) {
        console.log("Data tidak ada");
    }
}