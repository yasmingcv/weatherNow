'use strict'

import './router.js'
import { getClimaCidade } from './openweather.js'

const cidadesFavoritas = []

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

export const listenerPesquisaCidade = () => {
    document.getElementById('input-search').addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
            this.blur()
        }
    })
    document.getElementById('input-search').addEventListener('blur', pesquisarCidade)
}


//Tela cidades favoritas
export const carregarCidadesFavoritas = async () => {

    for (const cidade of cidadesFavoritas) {
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

    let adicionar = document.getElementById('add-favorito')
    let remover = document.getElementById('favorito')

    //Se a cidade já foi adicionada as favoritas, deixa o botão de remover cidade das favoritas disponível
    if (cidadesFavoritas.includes(cidade)) {
        remover.classList.remove('invisible')
        remover.classList.add('visible')
        adicionar.classList.add('invisible')
    }

    adicionar.addEventListener('click', () => {
        adicionarAosFavoritos(cidade)
    })

    remover.addEventListener('click', () => {
        removerDosFavoritos(cidade)
    })


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

//Barra de menu
const aparecerMenuBars = () => {    
    const nav_bars = document.getElementById('nav-bars')

    if (nav_bars.style.display == 'flex') {
        nav_bars.style.display = 'none'
    } else {
        nav_bars.style.display = 'flex'
    }
}

//Listener para barra de menu
const bars = document.getElementById('bars')
bars.addEventListener('click', aparecerMenuBars)

//Adiciona uma cidade aos favoritos
const adicionarAosFavoritos = (cidade) => {
    let adicionar = document.getElementById('add-favorito')
    let remover = document.getElementById('favorito')

    adicionar.classList.remove('visible')
    adicionar.classList.add('invisible')
    remover.classList.remove('invisible')
    remover.classList.add('visible')

    cidadesFavoritas.push(cidade)

}

//Remove uma cidade dos favoritos
const removerDosFavoritos = (cidade) => {
    let adicionar = document.getElementById('add-favorito')
    let remover = document.getElementById('favorito')
    const index = cidadesFavoritas.indexOf(cidade)

    adicionar.classList.remove('invisible')
    adicionar.classList.add('visible')
    remover.classList.remove('visible')
    remover.classList.add('invisible')

    cidadesFavoritas.splice(index, 1)

}

listenerPesquisaCidade()