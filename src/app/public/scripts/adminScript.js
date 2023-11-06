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

const closeAccountModal = () => {
    let accountModalSelector = document.querySelector("#account-modal");
    let accountModal = bootstrap.Modal.getInstance(accountModalSelector);
    accountModal.hide();
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
            closeAccountModal();
            getUserInfo(id);
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
