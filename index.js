const request = require('request');
class Login {
  constructor(config, stuff) {
    this.config = config;
    this.logger = stuff.logger;
  }

  authenticate(user, password, callback) {
    const self = this;
    const autenticacao = 'Basic '+ Buffer.from(':' + password).toString('base64');
    
    const options = { 
      method: 'GET',
      url: `https://${self.config.account}.vsaex.visualstudio.com/_apis/userentitlementsummary`,
      qs: { select: 'projects' },
      headers: {  Authorization: autenticacao, Accept: 'application/json' }
    };
    
    return request(options, function (error, response, body) {    
      if (error || !body) return callback(error || 'body empty');
      
      try {
        const objJson = JSON.parse(body);
        const ids = objJson.projectRefs.map((array)=>{
          return array.id;
        });
        return callback(null,ids)
      } catch (erro) {
        return callback(erro);
      }
    });
  }
}


module.exports = (...args) => new Login(...args);

