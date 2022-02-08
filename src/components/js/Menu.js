import React, {useState } from 'react';
import '../css/Menu.css'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { CgMenuLeft, CgClose } from 'react-icons/cg'

const Menu = ({ darkMode, setDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const openRepository = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    return (
        <>
            <div className="menu-icon-container">
                {isOpen ? <CgClose onClick={() => setIsOpen(!isOpen)} /> : <CgMenuLeft onClick={() => setIsOpen(!isOpen)} />}
            </div>
            <div className={darkMode ? "menu-container bg-dark text-light" :
                'menu-container bg-light text-dark'}>
                <ul className={isOpen ? 'menu-list open' : 'menu-list'}>
                    <li>{darkMode ? <MdLightMode onClick={() => {
                        setDarkMode(!darkMode)
                        setIsOpen(!isOpen)
                    }} /> :
                        <MdDarkMode onClick={() => {
                            setDarkMode(!darkMode)
                            setIsOpen(!isOpen)
                        }} />}</li>
                    <li><p onClick={() => {
                        openRepository('https://github.com/santiagogruneiro/translator')
                        setIsOpen(!isOpen)
                    }}>View code on GitHub</p></li>
                </ul>
            </div>
        </>
    )
};

export default Menu;
