$(function() {

  $('#submit').click(function() {
    var nome = $('input:text').val();
    var normal = $("input[value='Normal']:checked").val();
    var nunes = $("input[value='Nunes']:checked").val();
    var urlPessoas = 'http://localhost:3000/pessoas';

    if(consultarPessoas(nome) > 0){
        if(normal.valueOf() === 'Normal'){
          $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: normal });
        }else if(nunes.valueOf() === 'Nunes'){
          $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: nunes });
        }
    }

    $(function(){
      location.href = 'file:///C:/Users/vicente/Documents/JogoDaForcaBlanka/tela-jogo.html';
      console.log('redirecionando...');
    })

  });

  function consultarPessoas(nome) {
    var cont = 0;
    $.get(urlPessoas).done(function(pessoas) {
      pessoas.forEach(function(elem){
        if(nome !== elem.nome){
          cont++;
        }
      });
    })
      return cont;
  }

})
