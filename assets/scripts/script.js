document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggleBtn");
    const toggleLabel = document.querySelector(".toggle__container__toggle-label");
    const inputLabel = document.querySelector(".form__container__primary-label");
    const errorMessage = document.getElementById("errorMessage");
    const acaoMainBtn = document.getElementById("acaoMainBtn");
    const outputLabel = document.querySelector(".form__container__secondary__label");
    const resultText = document.getElementById("mensagemTexto");
    const copiarBtn = document.getElementById("copiarBtn");

    toggleLabel.textContent = toggleBtn.checked ? "Descriptografar" : "Criptografar";

    toggleBtn.addEventListener("change", function() {
        toggleLabel.textContent = toggleBtn.checked ? "Descriptografar" : "Criptografar";
        inputLabel.textContent = toggleBtn.checked ? "Qual palavra ou texto que deseja Descriptografar?" : "Qual palavra ou texto que deseja Criptografar?";
        acaoMainBtn.textContent = toggleBtn.checked ? "Descriptografar" : "Criptografar";
        outputLabel.textContent = toggleBtn.checked ? "Segue seu resultado Descriptografado:" : "Segue seu resultado Criptografado:";
        resultText.classList.remove("resultado-valido");
    });

    acaoMainBtn.addEventListener("click", function() {
        const textoOriginal = document.getElementById("textoArea").value.trim();
        
        if (textoOriginal === "") {
            errorMessage.style.display = "block";
            document.getElementById("textoArea").focus();
            document.getElementById("textoArea").classList.add("error__form");
            return;
        }

        errorMessage.style.display = "none";
        const textoLimpo = removerAcentos(textoOriginal);
        const textoResultado = toggleBtn.checked ? descriptografarTexto(textoLimpo) : criptografarTexto(textoLimpo);
        resultText.value = textoResultado.toLowerCase();
        resultText.classList.toggle("resultado-valido", !!textoResultado);
        copiarBtn.disabled = !textoResultado;
    });

    document.getElementById("textoArea").addEventListener("input", function() {
        errorMessage.style.display = "none";
        document.getElementById("textoArea").classList.remove("error__form");
    });

    document.getElementById("copiarBtn").addEventListener("click", function() {
        const textoResultado = document.getElementById("mensagemTexto").value.trim();
        if (textoResultado === "") {
            alert("Não há texto para copiar!");
            return;
        }
        resultText.select();
        document.execCommand("copy");
        alert("Texto copiado para a área de transferência!");
    });

    function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function criptografarTexto(texto) {
        const chaveCripto = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };

        const textoCriptografado = texto.toLowerCase().replace(/[eioua]/g, letra => chaveCripto[letra]);
        return textoCriptografado.charAt(0).toUpperCase() + textoCriptografado.slice(1);
    }

    function descriptografarTexto(texto) {
        const chaveDescripto = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        return texto.replace(/(enter|imes|ai|ober|ufat)/g, chave => chaveDescripto[chave]);
    }
});