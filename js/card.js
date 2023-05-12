'use strict'

import { route } from "./router.js"

class card_clima extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({mode: 'open'})

        this.clima = '00°'
        this.cidade = 'Cidade'
        this.cor = 'white'
    }

    static get observedAttributes() {
        return ['clima' , 'cidade', 'cor']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    component(){
        const card_clima = document.createElement('a')
        card_clima.classList.add('card-clima')

        const clima = document.createElement('h3')
        clima.textContent = this.clima

        const cidade = document.createElement('p')
        cidade.textContent = this.cidade

        card_clima.append(clima, cidade)

        return card_clima
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `
        .card-clima {
            width: 250px;
            border: 1px solid ${this.cor};
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
            color: #fff;
            display: flex;
            flex-direction: column;
            gap: 34px;
            padding: 30px;
            cursor: pointer;
        }
        .card-clima h3{
            font-size: 4rem;
            font-weight: 700;
            padding: 0;
            margin: 0;
        }
        .card-clima p{
            font-size: 1.5rem;
            font-weight: 400;
            padding:0;
            margin: 0;
        }
        .card-clima:hover{
            background-color: #111111;
            transition: .5s;
        } 
        `
        return css
    }
}

customElements.define('card-clima', card_clima)