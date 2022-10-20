const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;;

$('#add').click(() => {
    const name = $('#name').val();
    const url = $('#url').val();
    ipc.send('new_webhook', {name, url});
});

$('#cancel').click(() => {
    ipc.send('close_modal');
});