const fs = require('fs');
const dbContacts = require('./myDb');
const findPk = require('./findPk');
const Validator = require('validator');

module.exports = (oldName, newName, email, mobile) => {

    const dataContacts = dbContacts();

    // ambil index data yang akan diupdate
    const indexOldData = dataContacts.findIndex(x => x.name.toLowerCase() === oldName.toLowerCase());

    if (indexOldData === -1) {
        console.log(`Data ${oldName} tidak ditemukan`);
        return false
    }

    if (newName) {
        if (findPk(newName)) {
            console.log("Nama sudah tersedia");
            return false;
        } else {
            dataContacts[indexOldData].name = newName;
        }
    }

    // cek apakah user memasukkan nomor hp atau tidak
    if (mobile) {
        const isMobilePhoneValid = Validator.isMobilePhone(mobile, 'id-ID')
        if (!isMobilePhoneValid) { // jika validasi nombor handphone false
            // memberikan informasi kepada user bahwa nomor hp salah dan informasi nomor hp yang benar
            console.log("Format nomor telpon salah (contoh: 08212345678)");
            return false;
        }
        if (isMobilePhoneValid) { // kalau nomor telpon valid
            // mobile baru akan masuk ke contact berdasarkan index
            dataContacts[indexOldData].mobile = mobile;
        }
    }

    // cek apakah user memasukkan email atau tidak
    if (email) {
        const isEmailValid = Validator.isEmail(email);
        if (!isEmailValid) { // kondisi jika validasi false
            // memberikan informasi kepada user bahwa email salah dan informasi email yang benar
            console.log("Format email salah (contoh: example@domain.com)");
            return false;
        }
        if (isEmailValid) { // kalau email valid
            // email baru dimasukkan ke contact berdasarkan index
            dataContacts[indexOldData].email = email;
        }
    }

    fs.writeFileSync('./data/contacts.json', JSON.stringify(dataContacts));
    console.log(`Data ${oldName} berhasil diperbarui`);

}