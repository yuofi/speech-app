import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.iconContainer}>
                <Link legacyBehavior href="/profile">
                    <a style={styles.link}>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <desc>Created with Pixso.</desc>
                            <path id="profile15" d="M22 0C9.85 0 0 9.85 0 22C0 34.14 9.85 44 22 44C34.14 44 44 34.14 44 22C44 9.85 34.14 0 22 0ZM22 6.6C25.65 6.6 28.6 9.54 28.6 13.2C28.6 16.85 25.65 19.79 22 19.79C18.34 19.79 15.4 16.85 15.4 13.2C15.4 9.54 18.34 6.6 22 6.6ZM22 37.84C16.5 37.84 11.63 35.02 8.79 30.75C8.86 26.37 17.6 23.98 22 23.98C26.37 23.98 35.13 26.37 35.2 30.75C32.36 35.02 27.5 37.84 22 37.84Z" fill="#444444" fillOpacity="1.000000" fillRule="evenodd"/>
                        </svg>
                    </a>
                </Link>
            </div>
            <div style={styles.iconContainer}>
                <svg width="32.065" height="32.065" viewBox="0 0 32.065 32.065" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <desc>Created with Pixso.</desc>
                    <path id="search 267" d="M22.91 20.16L21.46 20.16L20.95 19.67C22.75 17.58 23.83 14.86 23.83 11.91C23.83 5.33 18.49 0 11.91 0C5.33 0 0 5.33 0 11.91C0 18.49 5.33 23.83 11.91 23.83C14.86 23.83 17.58 22.75 19.67 20.95L20.16 21.46L20.16 22.91L29.33 32.06L32.06 29.33L22.91 20.16ZM11.91 20.16C7.35 20.16 3.66 16.48 3.66 11.91C3.66 7.35 7.35 3.66 11.91 3.66C16.48 3.66 20.16 7.35 20.16 11.91C20.16 16.48 16.48 20.16 11.91 20.16Z" fill="#444444" fillOpacity="1.000000" fillRule="evenodd"/>
                </svg>
            </div>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        paddingBottom: '0px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
};
