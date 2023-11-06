const getStatement = (id) => {
    let accountID = id;
    $.ajax("/statement/" + accountID, {
        method: "GET",
        success: (data) => {
            $("#statement").html(data);
        }
    }).catch(err => {
        console.log(err);
        alert("Failed to get Statement");
    });
}

const allowDigit = (e) => {
    if (e.key < '0' && e.key > '9') {
        e.preventDefault();
    }
}

const preventPasting = (e) => {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86)) {
        e.preventDefault();
    }
}
$(() => {
    $('input').map(element => {
        element.oncontextmenu = (e) => { e.preventDefault() }
    })
})
