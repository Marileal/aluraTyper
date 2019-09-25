$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = 'Mariana';
  var numPalavras = $("#contador-palavras").text();
  var botaoRemove = "<a href='#'><i class='small material-icons'>delete</i></a>"
  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remove").click(removeLinha);
  corpoTabela.prepend(linha);
  $(".placar").slideDown(500);
  scrollPlacar();
}
function scrollPlacar(){
  var posPlacar = $(".placar").offset().top;
  $("html, body").animate({
    scrollTop: posPlacar+"px"
    // objeto do javascript só aceita string?
  }, 1000);
}

function novaLinha(usuario, palavras){
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").attr("href","#").addClass("botao-remove");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
  link.append(icone);
  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);
  return linha;
}

function removeLinha(event){
    event.preventDefault();
    var linha = $(this).parent().parent()
    linha.fadeOut(500);
    setTimeout(function(){
      linha.remove();
    }, 500);
}

function mostraPlacar (){
  $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    var placar = [];
    var linha = $("tbody>tr");

    linha.each(function(){
      var usuario = $(this).find("tr:nth-child(1)");
      var numPalavras = $(this).find("tr:nth-child(2)");

      var score = {
        usuario: usuario,
        palavras: numPalavras
      }

      placar.push(score)
    });
      var dados = {
        placar: placar
      }
      $.post("http://localhost:3000/placar", dados, function(){
        console.log("placar postado no servidor com sucesso");
      })
}
