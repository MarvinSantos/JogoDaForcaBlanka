$(".btnTopFive").click(function(){
  listarTop5();
});
function listarTop5() {
  $.get('http://localhost:3000/pessoas').done(function (elem) {
    $('.pessoa').empty();
    var rankingOrdenado = [];
    var arrayTop5 = [];

    rankingOrdenado = elem.sort(function(elemEsq, elemDir){
      return elemEsq.pontos < elemDir.pontos;
    });

    arrayTop5 = rankingOrdenado.slice(0,5);
    $('.listaDoTop5').addClass('lista');
    arrayTop5.forEach(function (elem2) {
      $('.pessoa').append(
        $('<li>').html(elem2.nome + '- Pontuação: ' + elem2.pontos)
      );
    });
  });
};
