class TaskStringController {
    async show(req, res){
      const {string} = req.params;

      let vowel

      // Transforma a string em array e coloca em minúsculo para melhor verificação!
      const text = string.toLowerCase().split("")

      const vowels = ['a','e','i','o','u']

      // Verifica se é uma letra
      const verificaSeLetra = element => (element.charCodeAt()>=97 && element.charCodeAt()<=122)

      // Verifica se é vogal comparando se está no vetor vowels
      const verificaVogal = element => vowels.indexOf(element)>=0

      // Verifica se é consoante
      const verificaConsoante = element => (verificaSeLetra(element) && !verificaVogal(element))

      // Verifica se o elemento se repete
      const verificaRepeticao = (element) => {
        let cont = 0
        for(let i of text){
          if(element === i){cont++}
        }
        return (cont===1)
      }

      //Funcao geral que chama as outras para a verificação
      const geral = (text) => {
        for(let i = 2; i< text.length; i++){
          if(i>=2 && verificaVogal(text[i]) && verificaConsoante(text[i-1] || '0') && verificaVogal(text[i-2] || '0') && verificaRepeticao(text[i])){
            vowel = text[i]
            break
          }
        }
        
      }

      let antes = Date.now();
      geral(text)
      let duracao = Date.now() - antes;

      return res.json({
                string: string,
                vogal: vowel,
                tempoTotal: duracao+'ms',
              })
    }
}

export default new TaskStringController();
