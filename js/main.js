var tInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
  console.log("pronto");
  atualizaFrase();
  iniciaContadores();
  iniciaCrono();
  iniciaCorretores();
  $("#botao-reinicia").click(resetaBotao());
});

function atualizaFrase(){
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function iniciaContadores(){
  campo.on("input", function(){
    var conteudo = campo.val();
    var caracteres = conteudo.length;
    var numWords = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(numWords);
    $("#contador-caracteres").text(caracteres);
  });
}
function iniciaCrono(){
  var tempoCount = $("#tempo-digitacao").text();
  campo.one("focus", function(){
    $("#botao-reinicia").attr("disabled", true);
    var cronoId = setInterval(function(){
      // é aqui que vai a desabilitação do botao?
      // $("#botao-reinicia").attr("disabled", true);
      tempoCount--;
      $("#tempo-digitacao").text(tempoCount);
      if(tempoCount < 1){
        $("#botao-reinicia").attr("disabled", false);
        tempoCount=0;
        campo.attr("disabled", true);
        clearInterval(cronoId);
        campo.toggleClass("campo-desativado");
      }
      console.log(tempoCount);
    },1000);
  });
}
function iniciaCorretores(){
  var frase = $(".frase").text();
  campo.on("input", function() {
    var digitado = campo.val();
    var compare = frase.substr(0 , digitado.length);
    if (digitado == compare){
      console.log("certo");
      // campo.removeClass("borda-vermelha");
      // campo.addClass("borda-verde");

    // } else if (digitado < 1) {
    //   campo.removeClass("borda-verde");
    //   campo.removeClass("borda-vermelha");
    } else {
      console.log("errado");
      // campo.removeClass("borda-verde");
      // campor.addClass("borda-vermelha");
    }
  });
};

function resetaBotao(){
  $("#botao-reinicia").click(function(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tInicial);
    iniciaCrono();
    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
  });
}
