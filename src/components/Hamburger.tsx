import { useState, useEffect, useContext ,ReactNode } from 'react';
import { WindowSize } from '../App';

export interface HamburgerProps {
    onClick: () => void;
    isInitiallyOpen?: boolean;
    children?: ReactNode;
}

export function Hamburger({ onClick, isInitiallyOpen, children }: HamburgerProps) {
    const { width } = useContext(WindowSize);
    const [isOpen, setIsOpen] = useState<boolean>(isInitiallyOpen ?? false);

    useEffect(() => {
        setIsOpen(width <= 768);
    }, [width]);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
        onClick();
    };

    if (width > 768) {
        return <div className="desktop-search-bar">{children}</div>;
    }

    return (
        <>
            <div className="hamburger-container">
                <button
                    onClick={handleClick}
                    type="button"
                    className="hamburger-button"
                >
                    <span className={`line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`line ${isOpen ? 'open' : ''}`}></span>
                </button>
            </div>
            {isOpen && (
                <div className="popup-list">
                    {children}
                </div>
            )}
        </>
    );
}