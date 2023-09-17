const logoutButton = new LogoutButton;

ApiConnector.current(funCurrentCB);

function funCurrentCB(response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
    else {
        throw response.error;
    }
}

logoutButton.action = () =>{
    ApiConnector.logout(funLogoutCB);
}; 

function funLogoutCB(response) {
    if (response.success) {
        location.reload();
    }
    else {
        throw response.error;
    }
}

const ratesBoard = new RatesBoard;

ApiConnector.getStocks(funGetStocksCB);

setTimeout(() => {
    ApiConnector.getStocks(funGetStocksCB);
    }, 60000);

function funGetStocksCB(response) {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
    else {
        throw response.error;
    }
}

const moneyManager = new MoneyManager;

function processingResponse_moneyManager(response, msg) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, msg);
    }
    else {
        moneyManager.setMessage(response.success,response.error);
    }
}

moneyManager.addMoneyCallback = (data) =>{
    ApiConnector.addMoney(data, (response) => {
        processingResponse_moneyManager(response, "Пополнение выполнено успешно.");
    });
};

moneyManager.conversionMoneyCallback = (data) =>{
    ApiConnector.convertMoney(data, (response) => {
        processingResponse_moneyManager(response, "Конвертация выполнена успешно.");
    });
};

moneyManager.sendMoneyCallback  = (data) =>{
    ApiConnector.transferMoney(data, (response) => {
        processingResponse_moneyManager(response, "Перевод выполнен успешно.");
    });
};

const favoritesWidget = new FavoritesWidget;

function processingResponse_Favorites(response, msg) {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        if (msg) {
            favoritesWidget.setMessage(response.success,msg);
        }
    }
    else {
        if (msg) {
            favoritesWidget.setMessage(response.success,response.error);
        }
    }
}

ApiConnector.getFavorites((response) => {
    processingResponse_Favorites(response, "");
});

favoritesWidget.addUserCallback =  (data) =>{
    ApiConnector.addUserToFavorites(data, (response) => {
        processingResponse_Favorites(response, "Пользователь добавлен успешно.");
    })
};

favoritesWidget.removeUserCallback =  (data) =>{
    ApiConnector.removeUserFromFavorites(data, (response) => {
        processingResponse_Favorites(response, "Пользователь удален успешно.");
    })
};


 