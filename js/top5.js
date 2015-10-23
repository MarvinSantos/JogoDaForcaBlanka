$(".button-top5").click(function(){
  listarTop5();
}
function listarTop5() {
  $.get().done(function (elem) {
    elem.forEach(function () {
      var arraynomes=[];
      arraynomes.add({nome : elem.nome pontuacao : elem.pontuacao});
    });
  });
}
