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

    fieldTabContent.append(`<div class="tab-pane fade show" id="tab-${id}" role="tabpanel" aria-labelledby="tab-${id}">
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
                    </div>`);

    const navLink = $(`#navLink-${id}`);
    //navLink.addClass('active');
    navLink.tab('show');
});