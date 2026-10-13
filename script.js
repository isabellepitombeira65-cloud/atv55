document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcularBtn');
    const cepInput = document.getElementById('cep');
    const resultadoSection = document.getElementById('resultadoSection');
    
    const resLogradouro = document.getElementById('resLogradouro');
    const resBairro = document.getElementById('resBairro');
    const resDistancia = document.getElementById('resDistancia');
    const resPreco = document.getElementById('resPreco');

    calcularBtn.addEventListener('click', async function() {
        let cep = cepInput.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
            return;
        }

        try {
            // Consulta à API Pública ViaCEP
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado!');
                resultadoSection.classList.add('hidden');
                return;
            }

            // Exibir os dados do endereço recolhidos da API
            resLogradouro.textContent = data.logradouro ? `${data.logradouro}, ${data.complemento || ''}` : 'Endereço Geral';
            resBairro.textContent = `${data.bairro || 'Bairro não informado'} - ${data.localidade}/${data.uf}`;

            // Simulação de cálculo de distância e preço baseada no CEP (para fins académicos/demonstração)
            // Geramos um valor coerente baseado nos números do próprio CEP para simular a distância da Uninassau[cite: 5]
            const distanciaKm = (parseInt(cep.substring(5, 8)) % 12 + 2).toFixed(1); 
            
            // Cálculo simulado do Uber Moto: Taxa base (R$ 5,00) + R$ 2,50 por km
            const precoUberMoto = 5.00 + (parseFloat(distanciaKm) * 2.50);

            resDistancia.textContent = `${distanciaKm} km (aprox. da Uninassau)`;
            resPreco.textContent = `R$ ${precoUberMoto.toFixed(2).replace('.', ',')}`;

            // Mostra o cartão com os resultados
            resultadoSection.classList.remove('hidden');

        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP. Tente novamente.');
        }
    });
});