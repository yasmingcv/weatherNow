'use strict'

import './router.js'
import { getClimaCidade } from './openweather.js'

const jsonTesteCidades = { cidades: ['Itapevi'] }
localStorage.setItem('array', jsonTesteCidades)
console.log(localStorage.getItem('array'));

//Cria o card da cidade, passando onde se deve criar (favoritos ou pesquisa)
const criarCardCidade = (cidade, local) => {
    const main = document.getElementById(local)

    const card = document.createElement('card-clima')
    card.cidade = `${cidade.nome} - ${cidade.pais}`
    card.clima = `${cidade.temperatura}º`
    card.cor = definirCor(cidade.temperatura)
    card.href = '/cidade'
    card.onclick = route

    if (local == 'cidade-encontrada') {
        main.replaceChildren(card)
    } else if (local == 'container-favoritos') {
        main.append(card)
    }

    card.addEventListener('click', () => {
        localStorage.setItem('cidade', cidade.nome)
    })

}

//Tela de pesquisa
export const pesquisarCidade = async () => {
    const cidade = document.getElementById('input-search').value
    const cidadePesquisada = await getClimaCidade(cidade)

    criarCardCidade(cidadePesquisada, 'cidade-encontrada')
}

document.getElementById('input-search').addEventListener('blur', pesquisarCidade)

//Tela cidades favoritas
export const carregarCidadesFavoritas = async () => {

    for (const cidade of jsonTesteCidades.cidades) {
        const cidadePesquisada = await getClimaCidade(cidade)

        criarCardCidade(cidadePesquisada, 'container-favoritos')
    }
}

//Tela com detalhes da cidade
export const criarTelaCidade = async (cidade) => {
    const cidadePesquisada = await getClimaCidade(cidade)

    const temperatura = document.getElementById('temp-cidade')
    temperatura.textContent = `${cidadePesquisada.temperatura}º`
    temperatura.style.color = definirCor(cidadePesquisada.temperatura)

    const nomeCidade = document.getElementById('nome-cidade')
    nomeCidade.textContent = `${cidadePesquisada.nome} - ${cidadePesquisada.pais}`

    const descCidade = document.getElementById('desc-cidade')
    descCidade.textContent = cidadePesquisada.descricao.charAt(0).toUpperCase() + cidadePesquisada.descricao.slice(1)

    const sensacaoTermica = document.getElementById('sensacao-termica')
    sensacaoTermica.textContent = `${cidadePesquisada.sencacao_termica}º`
    sensacaoTermica.style.color = definirCor(cidadePesquisada.sencacao_termica)

    const tempMinima = document.getElementById('minima')
    tempMinima.textContent = `${cidadePesquisada.minima}º`
    tempMinima.style.color = definirCor(cidadePesquisada.minima)

    const tempMaxima = document.getElementById('maxima')
    tempMaxima.textContent = `${cidadePesquisada.maxima}º`
    tempMaxima.style.color = definirCor(cidadePesquisada.maxima)

    const umidade = document.getElementById('umidade')
    umidade.textContent = `${cidadePesquisada.umidade}%`

}

//Definir as cores de acordo com a temperatura informada
const definirCor = (temperatura) => {
    let cor

    if (temperatura <= 20) {
        cor = '#91BCB2'
    } else if (temperatura > 20 && temperatura < 30) {
        cor = '#D9C300'
    } else {
        cor = '#FC4309'
    }

    return cor
}

export const adicionarAosFavoritos = () => {
    let adicionar = document.getElementById('add-favorito')
    let remover = document.getElementById('favorito')

    let city = document.getElementById('nome-cidade').textContent

    let cidade = city.slice(0, city.length - 4)

    if (jsonTesteCidades.cidades.includes(cidade)) {
        remover.classList.remove('invisible')
        remover.classList.add('visible')

        remover.addEventListener('click', () => {
            adicionar.classList.remove('invisible')
            adicionar.classList.add('visible')
            remover.classList.remove('visible')
            remover.classList.add('invisible')
        })

    } else {
        adicionar.addEventListener('click', () => {
            adicionar.classList.remove('visible')
            adicionar.classList.add('invisible')
            remover.classList.remove('invisible')
            remover.classList.add('visible')

            console.log(cidade);

            jsonTesteCidades.cidades.push(cidade)
            console.log(jsonTesteCidades.cidades);
        })
    }
}

