const chatbotIcon = document.getElementById('chatbot-icon');
const chatbot = document.getElementById('chatbot');
const tooltip = document.getElementById('tooltip');

let tooltipTimeout;
let displayingOptions = false;

chatbotIcon.addEventListener('mouseover', () => {
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    clearTimeout(tooltipTimeout);
});

chatbotIcon.addEventListener('mouseleave', () => {
    tooltipTimeout = setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 500);
    }, 3000);
});

chatbotIcon.addEventListener('click', () => {
    chatbot.style.display = 'block';
    displayWelcomeMessage();
});

function closeChatbot() {
    clearMessages();
    chatbot.style.display = 'none';
}

const responses = {
    "1": "Somos uma empresa de funilaria localizada em Embu das Artes - SP, oferecendo serviços especializados de reparo e recuperação de carrocerias desde 2001. Nosso compromisso é fornecer soluções de alta qualidade para pequenos amassados, alinhamento de peças, restauração completa após colisões e muito mais, garantindo que seu veículo volte às ruas em perfeito estado.",
    "2": "Nossos serviços são: Funilaria, pintura, martelinho, polimento/cristalização, entre outros.",
    "3": "Estamos no endereço R. Montreal, nº4 - Jardim Santa Emília. Localizado no Embu das Artes, São Paulo.",
    "4": "Nosso horário de funcionamento é de segunda a sexta das 8 às 18hrs.",
    "5": "Gostaria de solicitar um orçamento ou tirar dúvidas sobre serviços? Entre em contato conosco através do telefone (11) 97644-6054 ou através do e-mail gilcarfunilaria2001@gmail.com",
    "6": "Quer conhecer mais dos nossos serviços? Nos siga nas redes sociais! @funilariagilcar",
    "7": "Espero ter ajudado, até logo!"
};

function displayWelcomeMessage() {
    addMessage('bot', 'Olá, seja bem-vindo! É um prazer poder ajudá-lo(a)!', () => {
        setTimeout(displayOptions, 2000);
    });
}

function displayOptions() {
    displayingOptions = true;
    addMessage('bot', 'Selecione uma das opções a seguir:', () => {
        const options = [
            '1- Quem somos?',
            '2- Serviços prestados',
            '3- Localização',
            '4- Horário de funcionamento',
            '5- Fale Conosco',
            '6- Redes Sociais',
            '7- Sair'
        ];
        options.forEach(option => {
            addMessageButton('bot', option, () => handleOptionClick(option.charAt(0)));
        });
    });
}

function handleOptionClick(option) {
    if (displayingOptions) {
        if (responses[option]) {
            addMessage('bot', responses[option], () => {
                if (option === "7") {
                    setTimeout(closeChatbot, 3000);
                } else {
                    addFollowUpOptions();
                }
            });
        } else {
            addMessage('bot', 'Desculpe, não entendi a opção selecionada, vamos recomeçar?', displayOptions);
        }
    } else {
        addMessage('bot', 'Desculpe, não entendi a opção selecionada, vamos recomeçar?', displayOptions);
    }
}

function addFollowUpOptions() {
    displayingOptions = false;

    addMessage('bot', 'Posso ajudá-lo com mais informações?');

    addMessageButton('bot', 'Sim, por favor.', () => handleFollowUpClick('SIM'));
    addMessageButton('bot', 'Não, obrigado.', () => handleFollowUpClick('NÃO'));
}

function handleFollowUpClick(option) {
    if (option === "SIM") {
        displayOptions();
    } else if (option === "NÃO") {
        addMessage('bot', 'Espero ter ajudado, aguardamos seu contato!');
        setTimeout(closeChatbot, 4000);
    }
}

function addMessage(sender, text, callback) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    messageDiv.appendChild(textDiv);
    messagesDiv.appendChild(messageDiv);

    typeText(textDiv, text, callback);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addMessageButton(sender, text, clickHandler) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const button = document.createElement('button');
    button.classList.add('option');
    button.textContent = text;
    button.addEventListener('click', clickHandler);

    messageDiv.appendChild(button);
    messagesDiv.appendChild(messageDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function typeText(element, text, callback) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, 40);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function clearMessages() {
    const messagesDiv = document.getElementById('messages');
    while (messagesDiv.firstChild) {
        messagesDiv.removeChild(messagesDiv.firstChild);
    }
}