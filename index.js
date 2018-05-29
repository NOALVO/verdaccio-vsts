const request = require('request')
const verdaccio = require('verdaccio')

function Auth(config, stuff) {
  var self = Object.create(Auth.prototype);
  self._users = {};
  
  // config for this module
  self._config = config;
  
  // verdaccio logger
  self._logger = stuff.logger;
  
  // pass verdaccio logger to ldapauth
  //self._config.client_options.log = stuff.logger;
  
  return self;
}

Auth.prototype.authenticate = (user, password, callback) => {
  
  // let autenticacao = 'Basic OmNkN29oaWxwcTZueXpxZTd6Z3prd3NiNndpZXR4bWtlYTd1N3dzNnBsZWZmZjZpcWMydnE=';
  let autenticacao = 'Basic '+ Buffer.from(':' + password).toString('base64');
  
  const options = { 
    method: 'GET',
    url: 'https://noalvo.vsaex.visualstudio.com/_apis/userentitlementsummary',
    qs: { select: 'projects' },
    headers: {  Authorization: autenticacao }
  };
  
  request(options, function (error, response, body) {
    
    if (error) return callback(error);
    
    var objJson = JSON.parse(body);
    var ids = objJson.projectRefs.map((array)=>{
      return array.id;
    });
    return callback(null,ids)
  });
};
module.exports = Auth;
