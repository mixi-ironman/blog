import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../loading';
const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 25px;
    line-height: 1;
    color: black;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;

    height: ${(props) => props.height || '66px'};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-top: 30px;
    transform: translate(50%);
    background-color: pink;
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`;
const Button = ({ type = 'button', onClick = () => {}, children, ...props }) => {
    const { isLoading } = props;

    const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    // console.log(props);
    return (
        <>
            <ButtonStyles type={type} onClick={onClick} {...props}>
                {child}
            </ButtonStyles>
        </>
    );
};

export default Button;
