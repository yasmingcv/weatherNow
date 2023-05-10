'use strict'
import { pesquisarCidade } from "./app.js"
import { carregarCidadesFavoritas } from "./app.js"
import { criarTelaCidade } from "./app.js"
import { listenerPesquisaCidade } from "./app.js"

const routes = {
    '/cidades' : 'pages/cidades.html',
    '/favoritos' : 'pages/favoritos.html',
    '/cidade' : 'pages/cidade.html'
}

export const route = async () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)

    const path = window.location.pathname

    const response = await fetch(routes[path])
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    if(path == '/cidades'){
        listenerPesquisaCidade()
    } 
    if(path == '/favoritos'){
        carregarCidadesFavoritas()
    }
    if(path == '/cidade'){
        criarTelaCidade(localStorage.getItem('cidade'))
    }
}

window.route = route