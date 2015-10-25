function perguntaAleatoria(){
  indice = Math.floor(Math.random() * perguntas.length);
  var pergunta= perguntas[indice];
  mostraPergunta(pergunta);
};

function confereResposta(){
	var respostaInserida = $('#resposta').val();
	if(resposta !== ''){
		if(resposta[indice].toLowerCase() === respostaInserida.toLowerCase()){
			pontuacao+=10;
			alert('Resposta correta');
		} else {
			alert('Resposta errada');
		}
	}
}

function mostraPergunta(pergunta){
  $('.tamanho-letra').append(
    $('<h4>'+pergunta+'</h4>').addClass('inline').addClass('tamanho-letra').css("margin-left","20px")
  );
};

(function pegaPerguntas(){
  perguntas=[];
  resposta=[];
  var promise = $.get("http://localhost:3000/perguntas");
  promise.done(function (elem) {
      elem.forEach(function (elem2) {
        perguntas.push(elem2.pergunta);
        resposta.push(elem2.resposta);
      })
      perguntaAleatoria();
  });
})();