const renderApp = (data) => {
  $(body).html(data);
}

const renderContent = (data) => {
  $("#contentDiv").html(data);
}

const login = () => {
  let url = '/auth/login';
  let method = 'POST';
  let username = $("#loginUN").val();
  let password = $("#loginPW").val();
  let data = {
    username: username,
    password: password
  };
  let config = {};
  config = {
    url: url,
    method: method,
    data: data
  }
  $.ajax(config).then(result => window.location = '/').catch(err => { console.log(err); alert(err) });
}

const signup = () => {
  let url = '/auth/signup';
  let method = 'POST';
  let username = $("#signUpUN").val();
  let password = $("#signUpPW").val();
  let data = {
    username: username,
    password: password
  };
  let config = {};
  config = {
    url: url,
    method: method,
    data: data
  }
  $.ajax(config).then().catch(err => { console.log(err); alert(err) });
}

const getDashboard = () => {
  let url = '/dashboard';
  let method = 'POST';
  $.ajax({
    url: url,
    method: method
  }).then(result => renderContent(result)).catch(err => { console.log(err); alert(err) });
}

const getProfile = () => {
  alert("Profile page \nComing Soon...")
}

const getAccounts = (id) => {
  let url = '/account';
  let data = {};
  let config = {};
  let method = 'POST';
  if (id == null) {
    url = '/accounts';
    config = {
      url: url,
      method: method,
    }
  }
  else {
    data = { accountID: id }
    config = {
      url: url,
      method: method,
      data: data
    }
  }
  $.ajax(config).then(result => renderContent(result)).catch(err => { console.log(err); alert(err.responseText) });
}

const payAccount = () => {
  let debtorID = $("#accountID").val();
  let creditorID = $("#creditorID").val();
  let amount = $("#amount").val();
  if(creditorID == null){
    alert("Please provide Recipient account number");
  }
  if(amount == null){
    alert("Please provide amount");
  }
  let url = '/pay';
  let method = 'POST';
  let data = { debtorID: debtorID, creditorID: creditorID, amount: amount };
  let config = {
    url: url,
    method: method,
    data: data
  };
  $.ajax(config).then(result => getAccounts(debtorID)).catch(err => { console.log(err); alert(err.responseText) });
}

window.onload = () => {
  console.log("READY!");
  getDashboard();
}




