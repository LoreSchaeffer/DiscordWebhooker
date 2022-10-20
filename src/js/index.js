const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;

$('#addWebhook').click(() => {
    ipc.send('add_webhook');
});

const fieldTabs = $('#fieldsTab');
const fieldTabContent = $('#fieldTabContent');
const newTab = $('#newTab');

newTab.click(() => {
    const id = fieldTabs.children().length;

    $('.nav-link').removeClass('active');
    $('.tab-pane').removeClass('active');

    $(`<li class="nav-item"">
            <a id="navLink-${id}" class="nav-link" data-toggle="tab" href="#tab-${id}">Field ${id}</a>
        </li>`).insertBefore(newTab.parent());

    fieldTabContent.append(`<div class="tab-pane fade show field" id="tab-${id}" data-id="${id}" role="tabpanel" aria-labelledby="tab-${id}">
                        <div class="form-group row">
                            <label for="fieldName-${id}" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control form-control-sm" id="fieldName-${id}" placeholder="Field Name">
                            </div>
                            <div class="col-sm-2 form-check">
                                <input class="form-check-input" type="checkbox" value="" id="fieldInline-${id}">
                                <label class="form-check-label" for="fieldInline-${id}">Inline</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="fieldValue-${id}" class="col-sm-2 col-form-label">Value</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control form-control-sm" id="fieldValue-${id}" placeholder="Value">
                            </div>
                        </div>
                        <button id="remove-${id}" class="btn btn-danger">Remove</button>
                    </div>`);

    const navLink = $(`#navLink-${id}`);
    navLink.tab('show');

    $('#remove-' + id).click(() => {
        $('#navLink-' + id).parent().remove();
        $('#tab-' + id).remove();

        $('.nav-link').first().tab('show');
    });
});

$('#reset').click(() => {
    location.reload();
});

$('#send').click(() => {
    const webhook = $('#webhookSelect').val();
    const username = $('#username').val();
    const avatar = $('#avatar').val();
    const content = $('#content').val();
    const author = $('#authorName').val();
    const authorURL = $('#authorURL').val();
    const authorIcon = $('#authorIcon').val();
    const title = $('#title').val();
    const color = $('#color').val();
    const description = $('#description').val();
    const image = $('#image').val();
    const thumbnail = $('#thumbnail').val();
    const footer = $('#footer').val();
    const footerIcon = $('#footerIcon').val();
    const fields = [];

    $('.field').each((i, field) => {
        const id = $(field).attr('data-id');
        fields.push({
            name: $('#fieldName-' + id).val(),
            value: $('#fieldValue-' + id).val(),
            inline: $('#fieldInline-' + id).is(':checked')
        });
    });

    //TODO Create json and post it to the webhook
});