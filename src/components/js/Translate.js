import React, { useEffect, useState, useRef } from 'react';
import '../css/Translate.css'
import languages from '../../languages'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { handlerTranslator } from '../../services/handlerTranslator';

const Translate = ({ darkMode }) => {
    const [data, setData] = useState({ text: undefined, to: 'es', from: 'en' })
    const [equalError, setEqualError] = useState(false)
    const [currentLangName, setCurrentLangName] = useState({ from: 'English', to: 'Spanish' })
    const [translationResult, setTranslationResult] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const optionFrom = useRef(null)
    const optionTo = useRef(null)
    window.addEventListener('load', (e) => {
        optionFrom.current = e.target.all.source
        optionTo.current = e.target.all.target
    })
    useEffect(() => {
        if (data.text) {
            if (equalError) {
                alert(`Cannot translate from ${currentLangName.from} to ${currentLangName.to} for obvious reasons..\nPlease, change it!`)
                return
            }
            const timer = setTimeout(() => {
                setIsLoading(true)
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
        setEqualError(false)
        if (id === 'source') {
            setCurrentLangName({ ...currentLangName, from: target[values[1]].textContent })
            optionFrom.current = target
            if (values[0] === data.to) setEqualError(true)
            setData({ ...data, from: values[0] })
        } else {
            setCurrentLangName({ ...currentLangName, to: target[values[1]].textContent })
            optionTo.current = target
            if (values[0] === data.from) setEqualError(true)
            setData({ ...data, to: values[0] })
        }
    }
    const handleChangeText = ({ target: { value } }) => {
        setData((prev) => ({
            text: value,
            to: prev.to,
            from: prev.from
        }))
    }
    const handleLanguagesSwitch = () => {
        setData({ ...data, to: data.from, from: data.to })
        const valueFrom = optionFrom.current.selectedIndex
        const valueTo = optionTo.current.selectedIndex
        optionFrom.current.selectedOptions[0].selected = false
        optionTo.current.selectedOptions[0].selected = false
        optionFrom.current[valueTo].selected = true
        optionTo.current[valueFrom].selected = true
    }
    return (
        <>
            <header className='translate-header'>
                <div className="section-source">
                    <select  onChange={handleChangeSelect} className={equalError ? 'select-source error' : 'select-source'} id='source'>
                        {languages.languages.map((l, index) => (
                            <option selected={l.name === 'English' ? true : false} className={darkMode ? " bg-dark text-light" :
                                'bg-light text-dark'} value={[l.value, index + 1]}>{l.name}</option>
                        ))}
                    </select>
                </div>
                <HiOutlineSwitchHorizontal onClick={handleLanguagesSwitch} />
                <div className="section-target">
                    <select onChange={handleChangeSelect} className={equalError ? 'select-target error' : 'select-target'} id='target'>
                        {languages.languages.map((l, index) => (
                            <option selected={l.name === 'Spanish' ? true : false} className={darkMode ? " bg-dark text-light" :
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
                        {translationResult ? <p className='translationResult'>{translationResult}</p>  : <p className='result-placeholder'>{isLoading ? 'Translating...' : 'Translation result'}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Translate;
