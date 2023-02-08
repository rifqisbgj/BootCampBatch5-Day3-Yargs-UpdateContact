// import modul external (yargs) dan local (contacts)
const yargs = require('yargs');
const contacts = require('./handler/contacts');

// cara menggunakan yargs: node namafile add --var="value"
// bikin flag dengan nama variabel 'name' dengan value 'ripki'

yargs.command({ // membuat command
        command: 'add', // dengan nama comand 'add'
        describe: 'add new contact', // deskripsi command
        builder: { // item yang ada di dalam command
            name: {
                describe: 'Contact Name',
                demandOption: true, // REQUIRED
                type: 'string'
            },
            email: {
                describe: 'Contact Email',
                demandOption: false, // OPTIONAL
                type: 'string'
            },
            mobile: {
                describe: 'Contact Mobile Phone Number',
                demandOption: true, // REQUIRED
                type: 'string'
            },
        },
        handler(argv) {
            contacts.saveContact(argv.name, argv.email, argv.mobile);
        }
    })
    .command({
        command: 'detail',
        describe: 'detail a data contact',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            contacts.detail(argv.name);
        }
    })
    .command({
        command: 'list',
        describe: 'show all data contacts',
        handler() {
            contacts.listData();
        }
    })
    .command({
        command: 'delete',
        describe: 'delete a data contact',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            contacts.deleteData(argv.name);
        }
    })
    .command({
        command: 'update',
        describe: 'update a data contact',
        builder: {
            oldName: {
                describe: 'Old contact name for find data',
                demandOption: true,
                type: 'string',
            },
            newName: {
                describe: 'New name for new value of contact',
                demandOption: false,
                type: 'string',
            },
            newEmail: {
                describe: 'New email for new value of contact',
                demandOption: false,
                type: 'string',
            },
            newMobile: {
                describe: 'New mobile for new value of contact',
                demandOption: false,
                type: 'string',
            },
        },
        handler(argv) {
            contacts.updateData(argv.oldName, argv.newName, argv.newEmail, argv.newMobile);
        }
    });
yargs.parse();