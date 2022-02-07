import React, { useEffect, useState } from 'react';
import '../css/Translate.css'
import languages from '../../languages'
import { HiOutlineTranslate } from 'react-icons/hi'
import { handlerTranslator } from '../../services/handlerTranslator';

const Translate = () => {  
    const [data, setData] = useState({ q: undefined, target: 'es', source: 'en' })
    const [equalError, setEqualError] = useState(false)
    const [currentLangName, setCurrentLangName] = useState()
    const [translationResult,setTranslationResult]  = useState('')

    useEffect(() => {
        if (data.q) {
            if (equalError) {
                alert(`Cannot translate from ${currentLangName} to ${currentLangName} for obvious reasons..\nPlease, change it!`)
                return
            }
            const timer = setTimeout(() => {
                handlerTranslator.translate(data).then(res=>setTranslationResult(res))
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [data.q])

    const handleChangeSelect = ({target,target:{value,id}}) => {
        const values = value.split(",")
        setCurrentLangName(target[values[1]].textContent)
        setEqualError(false)
        if (id === 'source') {
            if (values[0] === data.target)
                setEqualError(true)
            setData((prev) => ({
                q: prev.q,
                target: prev.target,
                source: values[0]
            }))
        } else {
            if (values[0] === data.source)
                setEqualError(true)
            setData((prev) => ({
                q: prev.q,
                target: values[0],
                source: prev.source
            }))
        }
    }
    const handleChangeText = ({ target: { value } }) => {
        setData((prev) => ({
            q: value,
            target: prev.target,
            source: prev.source
        }))
    }
    return (
        <>
            <header className='translate-header'>
                <select onChange={handleChangeSelect} className={equalError ? 'select-source error' : 'select-source'} id='source'>
                    <option selected disabled hidden value="en">English</option>
                    {languages.languages.map((l,index) => (
                        <option  value={[l.value,index+1]}>{l.name}</option>
                    ))}
                </select>
                <HiOutlineTranslate />
                <select onChange={handleChangeSelect} className={equalError ? 'select-target error' : 'select-target'} id='target'>
                    <option selected disabled hidden value="es">Spanish</option>
                    {languages.languages.map((l,index) => (
                        <option value={[l.value,index+1]}>{l.name}</option>
                    ))}
                </select>
            </header>
            <div className="translate-container">
                <div className="translate-request">
                    <textarea onChange={handleChangeText} className="txtarea request" />
                </div>
                <div className="translate-response">
                    <div className="response" readOnly >
                        {translationResult && translationResult}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Translate;
