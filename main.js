const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    const speak = (mensagem) => {
      const utterance = new SpeechSynthesisUtterance(mensagem);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    };

    function start() {
      document.getElementById('textbox').value = 'Ouvindo...';
      recognition.start();
    }

    recognition.onresult = (event) => {
      const texto = event.results[0][0].transcript.toLowerCase();
      document.getElementById('textbox').value = texto;
      console.log('Você disse:', texto);

      const fontesDisponiveis = {
        'poetsen one': "'Poetsen One', sans-serif",
        'ancizar sans': "'Ancizar Sans', sans-serif",
        'arial': 'Arial, sans-serif',
        'share tech': "'Share Tech', sans-serif"
      };

      if (texto.includes('muda o fundo para')) {
        const cor = texto.split('muda o fundo para ')[1]?.trim();
        if (cor) {
          document.body.style.backgroundColor = cor;
          speak(`Fundo alterado para ${cor}`);
        }
      } else if (texto.includes('muda a cor do título para')) {
        const cor = texto.split('muda a cor do título para ')[1]?.trim();
        if (cor) {
          document.querySelector('h1').style.color = cor;
          speak(`Cor do título alterada para ${cor}`);
        }
      } else if (texto.includes('muda a fonte do título para')) {
        const nomeFonte = texto.split('muda a fonte do título para ')[1]?.trim();
        const fonteCSS = fontesDisponiveis[nomeFonte];
        if (fonteCSS) {
          document.querySelector('h1').style.fontFamily = fonteCSS;
          speak(`Fonte do título alterada para ${nomeFonte}`);
        } else {
          speak(`Fonte ${nomeFonte} não reconhecida.`);
        }
      } else {
        speak('Comando não reconhecido.');
        console.log('Comando não reconhecido');
      }
    };

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento:', event.error);
      let mensagem = 'Erro ao tentar ouvir. ';
      if (event.error === 'not-allowed') {
        mensagem += 'Permissão de microfone negada.';
      } else if (event.error === 'network') {
        mensagem += 'Problema de conexão.';
      } else {
        mensagem += 'Tente novamente.';
      }
      document.getElementById('textbox').value = mensagem;
      speak(mensagem);
    };