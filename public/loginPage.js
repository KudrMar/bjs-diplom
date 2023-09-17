"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, funLoginCB);
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, funRegisterCB);
};

function processingResponse(response) {
    if (response.success) {
        location.reload();
    }
    else {
        throw response.error;
    }
}

function funLoginCB(response) {
    processingResponse(response);
}

function funRegisterCB(response) {
    processingResponse(response);
}

