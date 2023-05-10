import React from 'react';
import styled from 'styled-components';

const LabelStyles = styled.div`
    color: black;
    font-weight: 600;
    cursor: pointer;
`;
const Label = ({
    htmlFor = '',
    children,
    ...props
}) => {
    // console.log(props);

    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    );
};

export default Label;
