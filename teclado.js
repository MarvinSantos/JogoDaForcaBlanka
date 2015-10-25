
(function pegaPalavras(){
  palavrasnormais=[];
  palavrasnunes=[];
  var promise = $.getJSON("http://localhost:3000/palavras");
  promise.done(function (elem) {
      elem.forEach(function (elem2) {
        palavrasnormais.push(elem2.palavra);
        if(elem2.palavra.length > 12){
          palavrasnunes.push(elem2.palavra);
        }       
      })
  });
})();

function esconde (value) {
  $("input[value='"+value+"']").css("display","none");
  pegaLetraDoTeclado(value);
};

function pegaLetraDoTeclado(value){
  letra = $("input[value='"+value+"']").val();
  comparaSeTemALetraNaPalavra();
};

function comparaSeTemALetraNaPalavra() {
  var countErros=0;
  for (var i = 0; i < palavraSecreta.length; i++) {
    if(palavraSecreta.charAt(i).toLowerCase() === letra.toLowerCase()){
      colocarALetraNoTraco(letra,i);
      console.log(letra + i);
    } else{
      countErros++;
    }
  }
};

function colocarALetraNoTraco(letra,index) {
  $("#resp p:nth-child("+(index+1)+")").html(letra.toUpperCase()).css("text-align","center").css("font-size","20pt");
};

function palavraAleatoria(arrayPalavras){
  var indice = Math.floor(Math.random() * arrayPalavras.length);
  criarTracos(arrayPalavras[indice]);
};

function criarTracos(palavra) {
    palavraSecreta=palavra;
    var tam = palavra.length;
    for (var i = 0; i < tam; i++) {
      if(palavra[i] !== ' '){
        $("#resp").append('<p>____</p>').css("text-align","center");
      } else{
        $("#resp").append('<p>***</p>').css("text-align","center");
      }
    }
    $('p').css("display","inline").css("margin-top","50px").css("margin-right","10px");
    $('#resp').css("display","block");
};

function verificaSePalpiteEstaCerto(palpite) {
  if(palpite.toLowerCase() === palavraSecreta.toLowerCase()){
    alert('Voce ganhou');
  } else {
    location.href="gameOver.html";
  }
}

