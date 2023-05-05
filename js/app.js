'use strict'

import './router.js'
import { getClimaCidade } from './openweather.js'

const jsonTesteCidades = { cidades: ['Madrid', 'São Paulo', 'João Pessoa', 'Ohio', 'Com', 'Doha', 'Seabra', 'Palmeiras', 'Itapevi'] }

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


    if(local == 'cidade-encontrada'){
        main.replaceChildren(card)
    } else if (local == 'container-favoritos'){
        main.append(card)
    }  

}

export const pesquisarCidade = async () => {
    const cidade = document.getElementById('input-search').value
    const cidadePesquisada = await getClimaCidade(cidade)

    console.log('teste');

    criarCardCidade(cidadePesquisada, 'cidade-encontrada')
}

document.getElementById('input-search').addEventListener('blur', pesquisarCidade)


export const carregarCidadesFavoritas = async () => {

    for (const cidade of jsonTesteCidades.cidades) {
        const cidadePesquisada = await getClimaCidade(cidade)


        criarCardCidade(cidadePesquisada, 'container-favoritos')
    }
}

