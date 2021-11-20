import React from 'react';

import './Header.scss';

export default function Header (props) {
    const {
        title,
        userName,
        className,
        renderIcon
    } = props;

    return (
        <div className={`Header ${className}`}>
            <div className='Header-Body'>
                <div className='flex-1 d-flex flex-row justify-content-start align-items-center'>
                    {renderIcon && renderIcon()}
                    <div className='Header-Title'>
                        {title}
                    </div>
                </div>
                <div className='flex-1 d-flex flex-row justify-content-end align-items-center'>
                    {userName && (
                        <div className='Header-UserName'>
                            {userName}
                        </div>
                    )}
                    <a href="#!" className='btn btn-primary Header-ExitBtn'>
                        Выйти
                    </a>
                </div>
            </div>
        </div>
    )
}
