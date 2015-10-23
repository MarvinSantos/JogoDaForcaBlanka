
$(function(){
  $('#submit').click(function(){
    var nome = $('input:text').val();
    var normal = $('#normal').checked;
    var nunes = $('#nunes').checked;
    if(normal === true){
      check = 'normal';
    }else{
      check = 'nunes';
    }
    adicionarJSON(nome, check);
  });

    function adicionarJSON(nome, check) {
      $.get('localhost:3000').done(function(data){
        var pessoas = data.pessoas[{nome: nome pontos: 0 dificuldade: check];
      })
    });
  });


});
