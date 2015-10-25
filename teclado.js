palavrasUsadas=[];
if(palavrasUsadas==='[]'){
   localStorage['palavrasUsadas'] = JSON.stringify(palavrasUsadas);
}

(function pegaPalavras(){
  pontuacao = 0;
  palavrasnormais=[]; // porque não é var?
  palavrasnunes=[];   // porque não é var?
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

function iniciarJogo() {
  dificuldade;
  countErros=0;
  pontuacao=0;
  countTracos=0;
  countLetrasTrocadas=0;
  limiteErros =(dificuldade === 'Nunes')? 2 : 5;
  if(dificuldade === 'Nunes'){
    palavraAleatoria(palavrasnunes);
  } else {
    palavraAleatoria(palavrasnormais);
  }
};

(function pegaArrayConformeDificuldade(){
  pontuacao = 0;
  $.get("http://localhost:3000/pessoas").done(function (elem) {
    dificuldade = elem[elem.length-1].dificuldade; // porque length-1?
    console.log(dificuldade);
    iniciarJogo();
  });
})();

function esconde (value) {
  $("input[value='"+value+"']").css("display","none");
  pegaLetraDoTeclado(value);
};

function pegaLetraDoTeclado(value){
  letra = $("input[value='"+value+"']").val();
  var temLetra=comparaSeTemALetraNaPalavra();
  if(temLetra === 0){
    countErros++;
    erros(countErros);
    mostraLetraErrada(letra);
  }
};

function comparaSeTemALetraNaPalavra() {
  var contaLetras=0;
  for (var i = 0; i < palavraSecreta.length; i++) {
    console.log(letra.toLowerCase());
    if(palavraSecreta.charAt(i).toLowerCase() === letra.toLowerCase()){
      colocarALetraNoTraco(letra,i);
      dificuldade === 'Nunes' ? pontuacao+=3 : pontuacao+=2;
      contaLetras++;
    }
  }
  return contaLetras;
};

function erros(count){
  if(count === limiteErros){
    currentPoints += pontuacao;
    localStorage.setItem('pts',currentPoints);
    currentPoints = 0;
    salvaPontos('gameOver.html');
  }
}

function colocarALetraNoTraco(letra,index) {
  $("#resp p:nth-child("+(index+1)+")").html(letra.toUpperCase()).css("text-align","center").css("font-size","20pt");
  verificaSeGanhou();
};

function verificaSeGanhou(){
  countLetrasTrocadas++;
  if(countLetrasTrocadas === countTracos){
    currentPoints += pontuacao;
    salvaPontos("tela-jogo.html");
    alert('Voce acertou');
  }
};

$.patch = function(url, data, callback, type){

  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'PATCH',
    success: callback,
    data: data,
    contentType: type
  });
};

function salvaPontos(pagina){
  idUsuario = '';
  var paginaParaIr = pagina;
  $.get('http://localhost:3000/pessoas').done(function(data){
    idUsuario = data[data.length-1].id;
    $.get('http://localhost:3000/pessoas/'+idUsuario).done(function(data2){
      pontuacao += data2.pontos;
      $.patch('http://localhost:3000/pessoas/'+idUsuario,{pontos: pontuacao},function(){
        window.location.replace(paginaParaIr);
      })
    })
  });
};


function palavraAleatoria(arrayPalavras){
  var indice = Math.floor(Math.random() * arrayPalavras.length);
  criarTracos(arrayPalavras[indice]);
  var palavraSorteada=arrayPalavras[indice];
  var palavrasLocalStorage = JSON.parse(localStorage["palavrasUsadas"]);

  if (arrayPalavras.length===palavrasLocalStorage.length-1) {
    localStorage["palavrasUsadas"]="[]";
  }
  else if($.inArray(palavraSorteada,palavrasLocalStorage) !== -1){
     palavraAleatoria(arrayPalavras);
  }
  else {
     insereLocalStorage();
  }
};

function criarTracos(palavra) {
    palavraSecreta=palavra;
    var tam = palavra.length;
    for (var i = 0; i < tam; i++) {
      if(palavra[i] !== ' '){
        $("#resp").append('<p>____</p>').css("text-align","center");
        countTracos++;
      } else{
        $("#resp").append('<p>***</p>').css("text-align","center");
      }
    }
    $('p').css("display","inline").css("margin-top","50px").css("margin-right","10px");
    $('#resp').css("display","block");
};

function verificaSePalpiteEstaCerto() {
  var palpite = $("#input-palpite").val();
  if(palpite.toLowerCase() === palavraSecreta.toLowerCase()){
    alert('Voce acertou');
    dificuldade === 'Nunes' ? pontuacao+=15 : pontuacao+=10;

    currentPoints += pontuacao;
    salvaPontos("tela-jogo.html");

  } else {
    currentPoints += pontuacao;
    localStorage.setItem('pts',currentPoints);
    currentPoints = 0;
    salvaPontos("gameOver.html");
  }
};

function insereLocalStorage() {
   palavrasUsadas = JSON.parse(localStorage["palavrasUsadas"]);
   palavrasUsadas.push(palavraSecreta);
   localStorage['palavrasUsadas'] = JSON.stringify(palavrasUsadas);

};

function mostraLetraErrada(letter){
  $('.letraErrada').append(
    $('<li>').html('-  '+letter +'  -').addClass('inline')
  )
};

function gravarBanco() {
  currentPoints = 0;
  var nome = $('input:text').val();
  if(nome !== ''){
    var normal = $("input[value='Normal']:checked").val();
    var nunes = $("input[value='Nunes']:checked").val();
    var urlPessoas = 'http://localhost:3000/pessoas';

    localStorage["pessoas"] = JSON.stringify({
      "nome": nome,
      "pontos": 0
    });


    if(normal === 'Normal'){
      $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: normal }).done(function(){
        irParaTelaJogo();
      });
    }else if(nunes === 'Nunes'){
      $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: nunes }).done(function(){
        irParaTelaJogo();
      });
    }
  }
};
