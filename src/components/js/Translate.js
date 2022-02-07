import React, { useEffect, useState } from 'react';
import '../css/Translate.css'
import languages from '../../languages'
import { HiOutlineTranslate } from 'react-icons/hi'
import { handlerTranslator } from '../../services/handlerTranslator';

const Translate = () => {
    const [data, setData] = useState({ text: undefined, to: 'es', from: 'en' })
    const [equalError, setEqualError] = useState(false)
    const [currentLangName, setCurrentLangName] = useState()
    const [translationResult, setTranslationResult] = useState('')

    useEffect(() => {
        if (data.text) {
            if (equalError) {
                alert(`Cannot translate from ${currentLangName} to ${currentLangName} for obvious reasons..\nPlease, change it!`)
                return
            }
            const timer = setTimeout(() => {
                handlerTranslator.translate(data).then(res => setTranslationResult(res[data.to]))
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [data.text])

    const handleChangeSelect = ({ target, target: { value, id } }) => {
        const values = value.split(",")
        setCurrentLangName(target[values[1]].textContent)
        setEqualError(false)
        if (id === 'source') {
            if (values[0] === data.to)
                setEqualError(true)
            setData((prev) => ({
                text: prev.text,
                to: prev.to,
                from: values[0]
            }))
        } else {
            if (values[0] === data.from)
                setEqualError(true)
            setData((prev) => ({
                text: prev.text,
                to: values[0],
                from: prev.from
            }))
        }
    }
    const handleChangeText = ({ target: { value } }) => {
        setData((prev) => ({
            text: value,
            to: prev.to,
            from: prev.from
        }))
    }
    return (
        <>
            <header className='translate-header'>
                <div className="section-source">
                <select onChange={handleChangeSelect} className={equalError ? 'select-source error' : 'select-source'} id='source'>
                    <option selected disabled hidden value="en">English</option>
                    {languages.languages.map((l, index) => (
                        <option value={[l.value, index + 1]}>{l.name}</option>
                    ))}
                </select>

                </div>


                

                <HiOutlineTranslate />
                <div className="section-target">  

                <select onChange={handleChangeSelect} className={equalError ? 'select-target error' : 'select-target'} id='target'>
                    <option selected disabled hidden value="es">Spanish</option>
                    {languages.languages.map((l, index) => (
                        <option value={[l.value, index + 1]}>{l.name}</option>
                    ))}
                </select>
                </div>
               
            </header>
            <div className="translate-container">
                <div className="translate-request">
                    <textarea onChange={handleChangeText} className="txtarea request" />
                </div>
                <div className="translate-response">
                    <div className="response" readOnly >
                        {translationResult ? translationResult : <p className='result-placeholder'>Result</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Translate;
