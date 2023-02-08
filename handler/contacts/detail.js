const findPk = require('./findPk');

module.exports = (name) => {
    // cek ketersediaan PK, sekaligus ambil data berdasarkan nama
    const dataUser = findPk(name);

    // erro handling jika kontak tidak ditemukan
    if (!dataUser) {
        console.log("Data kontak tidak ditemukan");
        return false;
    }

    // menampilkan detail dari kontak
    console.log("Nama: " + dataUser.name + "\n" + "No Hp: " + dataUser.mobile);
    // error handling jika email undefined
    if (!dataUser.email) {
        console.log("Email: email belum diatur");
        return false;
    }
    console.log("Email: " + dataUser.email);
}