import React, {useEffect, useState} from "react";

import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import './DropdownBtn.scss';

export default function DropdownBtn(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [btnName, setBtnName] = useState(props.btnName);

    const dropDownOpenHandler = () => {
        setIsOpen(!isOpen);
    }

    const dropDownHandler = (e) => {
        setBtnName(e.currentTarget.textContent);
        props.onSelectItem(props.name, e.currentTarget.textContent);
    }

    const listItems = props.items.map((el) =>
        <DropdownItem key={el} onClick={dropDownHandler}>
            {el}
        </DropdownItem>
    );

    return (
        <ButtonDropdown
            toggle={dropDownOpenHandler}
            isOpen={isOpen}
            size="lg"
            disabled={props.disabled}
        >
            <DropdownToggle caret className="btn-primary Dropdown-Name">
                {btnName}
            </DropdownToggle>
            <DropdownMenu>
                {props.header &&
                    <DropdownItem header>
                        {props.header}
                    </DropdownItem>
                }
                {listItems}
            </DropdownMenu>
        </ButtonDropdown>
    );
}
