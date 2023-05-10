import React, { useState } from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';
import { IconEyeOpen } from '../icon';

const InputStyles = styled.div`
    position: relative;
    width: 100%;

    input {
        width: 100%;
        padding: 20px;
        background-color: antiquewhite;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s linear;
        border: 1px solid transparent;
    }
    .input:focus {
        background-color: #f0f0f0;
    }
    .form {
        max-width: 600px;
        margin: 0 auto;
    }
    .input-icon {
        position: absolute;
        top: 50%;
        right: 2%;
        transform: translateY(-50%);
    }
`;
const Input = ({
    type = 'text',
    placeholder = '...',
    name = '',
    children,
    hasIcon,
    control,
    ...props
}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });
    // function handleBlur() {
    //     setValueInput('');
    // }
    // const [valueInput, setValueInput] = useState('');
    return (
        <>
            <InputStyles hasIcon={children ? true : false}>
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    // onChange={(e) => setValueInput(e.target.value)}
                    // // onBlur={handleBlur}
                    // value={valueInput}
                />
                {children ? <span className="input-icon">{children}</span> : null}
            </InputStyles>
        </>
    );
};

export default Input;
