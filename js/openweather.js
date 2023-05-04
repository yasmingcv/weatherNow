'use strict'

export const getClimaCidade = async (cidade) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=6f759079023446667ded4bd6ba98d4d5&lang=pt_br`
    const response = await fetch(url)
    const data = await response.json()

    return {
        temperatura: Math.trunc(data.main.temp),
        minima: Math.trunc(data.main.temp_min),
        maxima: Math.trunc(data.main.temp_max),
        sencacao_termica: Math.trunc(data.main.feels_like),
        umidade: data.main.humidity,
        nome: data.name,
        pais: data.sys.country
    }
}

