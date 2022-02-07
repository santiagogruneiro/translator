import axios from "axios"

const baseUrl = 'https://nlp-translation.p.rapidapi.com/v1/'


const translate = (data) => {
    const url = baseUrl+'translate'
    const baseOptions = {
        method:'POST',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'nlp-translation.p.rapidapi.com',
            'x-rapidapi-key': 'ccdc0418f2mshcecf9cc9a4d71b0p149c71jsn2e44f5ddd297'
          },
          body:JSON.stringify(data)
    }
  
    return fetch(url, baseOptions)
    .then(res=>{
       return res.text()
        .then(text=>{
            const data = text && JSON.parse(text)
            return data.translated_text
        })
    })
    .catch(err=>alert(err))

}
export const handlerTranslator = {
    translate,
    
}