
  function gravarBanco() {
    var nome = $('input:text').val();
    var normal = $("input[value='Normal']:checked").val();
    var nunes = $("input[value='Nunes']:checked").val();
    var urlPessoas = 'http://localhost:3000/pessoas';

    if(consultarPessoas(nome) > 0){
        if(normal === 'Normal'){
          console.log('aqui');
          $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: normal });
        }else if(nunes === 'Nunes'){
          $.post(urlPessoas, { nome: nome, pontos: 0, dificuldade: nunes });
        }
    }
    irParaTelaJogo();

  };

  function consultarPessoas(nome) {
    var cont = 0;
    $.get('http://localhost:3000/pessoas').done(function(pessoas) {
      pessoas.forEach(function(elem){
        if(nome !== elem.nome){
          cont++;
        }
      });
    })
      return cont;
  };


