import React, { useEffect, useState } from 'react';
import '../css/Translate.css'
import languages from '../../languages'
import { HiOutlineTranslate } from 'react-icons/hi'
import { handlerTranslator } from '../../services/handlerTranslator';

const Translate = ({ darkMode }) => {
    const [data, setData] = useState({ text: undefined, to: 'es', from: 'en' })
    const [equalError, setEqualError] = useState(false)
    const [currentLangName, setCurrentLangName] = useState()
    const [translationResult, setTranslationResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (data.text) {
            if (equalError) {
                alert(`Cannot translate from ${currentLangName} to ${currentLangName} for obvious reasons..\nPlease, change it!`)
                return
            }
            setIsLoading(true)
            const timer = setTimeout(() => {
                handlerTranslator.translate(data).then(res => {
                    if (res) {
                        setTranslationResult(res[data.to])
                    }
                })
            }, 1000)
            return () => {
                clearTimeout(timer)
                setIsLoading(false)
            }
        } else setTranslationResult('')
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
                            <option className={darkMode ? " bg-dark text-light" :
                                'bg-light text-dark'} value={[l.value, index + 1]}>{l.name}</option>
                        ))}
                    </select>
                </div>
                <HiOutlineTranslate onClick={() => alert('hola')} />
                <div className="section-target">
                    <select onChange={handleChangeSelect} className={equalError ? 'select-target error' : 'select-target'} id='target'>
                        <option selected disabled hidden value="es">Spanish</option>
                        {languages.languages.map((l, index) => (
                            <option className={darkMode ? " bg-dark text-light" :
                                'bg-light text-dark'} value={[l.value, index + 1]}>{l.name}</option>
                        ))}
                    </select>
                </div>
            </header>
            <div className="translate-container">
                <div className="translate-request">
                    <textarea onChange={handleChangeText} autoFocus className="txtarea request" />
                </div>
                <div className="translate-response">
                    <div className="response" readOnly >
                        {translationResult ? translationResult : <p className='result-placeholder'>{isLoading ? 'Translating...' : 'Translation result'}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Translate;
