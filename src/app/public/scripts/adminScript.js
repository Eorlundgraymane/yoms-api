let accountModal = null;

const getUserlist = () => {
    $.ajax("/admin/userlist", {
        method: "GET",
        success: (data) => {
            $("#userlist").html(data);
        }
    }).catch(err => {
        console.log(err);
        alert("Failed to get User list");
    });
}

const getUserInfo = (id) => {
    $.ajax("/admin/userinfo/" + id, {
        method: "GET",
        success: (data) => {
            $("#userinfo").html(data);
            initControls();
        }
    }).catch(err => {
        console.log(err);
        alert("Failed to get User list");
    });
}

const toggleAccountModal = (open) => {

    if (accountModal == null) {
        accountModal = new bootstrap.Modal($("#account-modal"));
    }
    if (open) {
        accountModal.show();
    }
    else {
        accountModal.hide();
    }
}

const openAccount = (id) => {
    let data = {};
    data.userID = id;
    data.accountName = $("#accountName").val();
    data.balance = $("#accountBalance").val();
    $.ajax("/admin/account/open", {
        method: "POST",
        data: data,
        success: (data) => {
            getUserInfo(id);
            toggleAccountModal(false);
        }
    }).catch(err => {
        console.log(err);
        alert("Failed to open Account");
    });
}

const getAccountInfo = (accountID) => {
    if (parseInt(accountID)) {
        $.ajax("/admin/account/" + accountID, {
            method: "GET",
            success: (data) => {
                $("#accountinfo").html(data);
            }
        }).catch(err => {
            console.log(err);
            alert("Failed to get Account");
        });
    }
}

const initControls = () => {
    $("#selectedAccount").on("change", function () {
        getAccountInfo($("#selectedAccount").val())
    })
}

$(() => {
    getUserlist();
});
