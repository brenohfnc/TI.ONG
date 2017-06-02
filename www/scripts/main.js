﻿(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.addEventListener('backbutton', function () {
            if ($('#Index') || $('#Home')) {
                e.preventDefault();
                navigator.app.exitApp();
            } else {
                navigator.app.backHistory();
            }
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function NavegarParaPagina(pageName) {
    window.location = pageName;
}

function MostrarErros(xhr) {
    $('.alert-danger').children('span').html(JSON.parse(xhr.responseText).ErrorMessage);
    $('.alert-danger').show();
}

function SalvarSessao(obj) {
    window.localStorage.setItem('Sessao', JSON.stringify(obj));
}

function GetSessao() {
    return JSON.parse(window.localStorage['Sessao']);
}

function VerificarLogado() {
    if (GetSessao() == null || GetSessao == {}) {
        NavegarParaPagina('index.html');
    }
}

function FazerLogout() {
    SalvarSessao({});
    NavegarParaPagina('index.html');
}

$(document).ajaxStart(function () {
    $('.alert-danger').hide();
    $(".loader").css("display", "block");
});

$(document).ajaxComplete(function () {
    $(".loader").css("display", "none");
});

$(document).on('click', '.close', function () {
    $('.alert-danger').hide();
});

