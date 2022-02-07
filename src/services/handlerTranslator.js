import axios from "axios"

const baseUrl = 'https://google-translate1.p.rapidapi.com/language/translate/v2'
const baseOptions = {
    headers: {
        'accept-encoding': 'application/gzip',
        'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
        'x-rapidapi-key': 'ccdc0418f2mshcecf9cc9a4d71b0p149c71jsn2e44f5ddd297'
    }
}

const translate = (data) => {
    baseOptions.headers['content-type'] = 'application/x-www-form-urlencoded'
    baseOptions['data'] = data
    return axios.post(baseUrl, baseOptions).then(handleResponse)

}
const detectLanguage = (data) => {
    let url = baseUrl + '/detect'
    baseOptions.headers['content-type'] = 'application/x-www-form-urlencoded'
    baseOptions['data'] = { q: data.text, target: data.target, source: data.source }
    return axios.post(url, baseOptions).then(handleResponse)
}


const getAvailableLanguages = () => {
    let url = baseUrl + '/languages'
    return axios.get(url, baseOptions)
    .then((res)=>console.log(res)
    .catch((err)=>console.log(err)))

}

const handleResponse = (res) => {
    return res.data.translations[0].translatedText
    .catch((err)=>alert(err))
}

export const handlerTranslator = {
    translate,
    detectLanguage,
    getAvailableLanguages
}