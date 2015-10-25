
function gravarBanco() {
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
