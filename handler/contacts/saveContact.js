const fs = require('fs');
const Validator = require('validator');
const findPk = require('./findPk');

module.exports = (name, email, mobile) => {
    if (findPk(name)) {
        console.log("Nama sudah tersedia");
        return false;
    }
    // cek apakah user memasukkan email atau tidak
    if (email) {
        const isEmailValid = Validator.isEmail(email);
        if (!isEmailValid) { // kondisi jika validasi false
            email = null // set null ke inputan email yang salah
            console.log("Format email salah (contoh: example@domain.com)");
            // memberikan informasi kepada user bahwa email salah dan informasi email yang benar
        }
    }
    // cek apakah user memasukkan nomor hp atau tidak
    const isMobilePhoneValid = Validator.isMobilePhone(mobile, 'id-ID')
    if (mobile) {
        if (!isMobilePhoneValid) { // jika validasi nombor handphone false
            mobile = null // set null ke inputan mobile number yang salah
            console.log("Format nomor telpon salah (contoh: 08212345678)");
            // memberikan informasi kepada user bahwa nomor hp salah dan informasi nomor hp yang benar
        }
    }

    // variable contact berisi seluruh inputan yang diinput user dengan format JSON
    const contact = {
        name,
        email,
        mobile
    }

    // membaca file contacts.json
    const rawData = fs.readFileSync('./data/contacts.json', 'utf-8');
    // membaca isi array dan merubah dalam bentuk array json
    const user = JSON.parse(rawData);

    // jika nomor hp tidak valid maka proses dihentikan
    // jika email tidak valid, maka hanya push name dan mobile
    if (!isMobilePhoneValid) {
        return false
    }

    if (!email) {
        user.push({
            name: name,
            mobile: mobile
        })
        fs.writeFileSync('./data/contacts.json', JSON.stringify(user));
        return false;
    }

    user.push(contact)

    // kemudian data tersebut ke contacts.json
    fs.writeFileSync('./data/contacts.json', JSON.stringify(user));
}