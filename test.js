var Auth = require('./index');

var xpto = new Auth('./config.yml','./Logger.js');
xpto.authenticate('felipe','hpxf6rsf62jmu43hpn5ddsjshwbjssvbnweco4y5bhuyw23izcxa',function(err,resposta){
  console.log(resposta)
});

