(function () {
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
    window.location.href = pageName;
}

function MostrarErros(xhr) {
    $('.alert').children('p').html(JSON.parse(xhr.responseText).ErrorMessage);
    $('.alert').removeClass('alert-sucesso').addClass('alert-erro').show();
}

function MostrarSucessos(successMsg) {
    $('.alert').children('p').html(successMsg);
    $('.alert').removeClass('alert-erro').addClass('alert-sucesso').show();
}

function SalvarSessao(obj) {
    window.localStorage.setItem('Sessao', JSON.stringify(obj));
}

function GetSessao() {
    if (window.localStorage['Sessao'] != '{}') {
        return JSON.parse(window.localStorage['Sessao']);
    } 
    return null;
}

function VerificarLogado() {
    if (GetSessao() == null) {
        NavegarParaPagina('index.html');
    }
    return true;
}

function FazerLogout() {
    SalvarSessao({});
    NavegarParaPagina('index.html');
}

function ValidarCampos() {
    $.validator.messages.required = function (param, input) {
        return `O campo ${$(input).data("nome")} é obrigatório`;
    }

    return $('form').valid();
}

function FormatarDate(date) {
    date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

function AjaxCall(url, method, data, successHandler) {
    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        dataType: 'json',
        data: data
    })
    .done(successHandler)
    .error(function (xhr) {
        MostrarErros(xhr);
    });
}

$(document).ajaxStart(function () {
    $('.alert-danger').hide();
    $(".loader").css("display", "block");
});

$(document).ajaxComplete(function () {
    $(".loader").css("display", "none");
});


