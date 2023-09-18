"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, funLoginCB);
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, funRegisterCB);
};

function processingResponseLogin(response) {
    if (response.success) {
        location.reload();
    }
    else {
        userForm.setLoginErrorMessage(response.error);
    }
}

function funLoginCB(response) {
    processingResponseLogin(response);
}

function processingResponseRegister(response) {
    if (response.success) {
        location.reload();
    }
    else {
        userForm.setRegisterErrorMessage(response.error);
    }
}

function funRegisterCB(response) {
    processingResponseRegister(response);
}

