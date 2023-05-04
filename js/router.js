'use strict'
import { pesquisarCidade } from "./app.js"

const routes = {
    '/cidades' : 'pages/cidades.html',
    '/favoritos' : 'pages/favoritos.html'
}

const route = async () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)

    const path = window.location.pathname

    const response = await fetch(routes[path])
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    if(path == '/cidades'){
        document.getElementById('input-search').addEventListener('blur', pesquisarCidade)
    }
}

window.route = route