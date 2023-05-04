'use strict'

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
}

window.route = route