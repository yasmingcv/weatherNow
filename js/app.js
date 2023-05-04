'use strict'

import './router.js'
import { getClimaCidade } from './openweather.js'

const jsonTesteCidades = { cidades: ['Madrid', 'São Paulo', 'João Pessoa', 'Ohio', 'Com', 'Doha'] }

const criarCardCidade = (cidade, local) => {
    const main = document.getElementById(local)

    const card = document.createElement('card-clima')
    card.cidade = `${cidade.nome} - ${cidade.pais}`
    card.clima = `${cidade.temperatura}º`

    if (cidade.temperatura <= 20) {
        card.cor = '#91BCB2'
    } else if (cidade.temperatura > 20 && cidade.temperatura < 30) {
        card.cor = '#D9C300'
    } else {
        card.cor = '#FC4309'
    }

    main.replaceChildren(card)

}

export const pesquisarCidade = async () => {
    const cidade = document.getElementById('input-search').value
    const cidadePesquisada = await getClimaCidade(cidade)

    console.log('teste');

    criarCardCidade(cidadePesquisada, 'cidade-encontrada')
}

document.getElementById('input-search').addEventListener('blur', pesquisarCidade)


export const carregarCidadesFavoritas = () => {

    jsonTesteCidades.cidades.forEach(cidade => {
        const cidadePesquisada = getClimaCidade(cidade)

        console.log(cidadePesquisada);

        criarCardCidade(cidadePesquisada, 'container-favoritos')
    })
}

carregarCidadesFavoritas()