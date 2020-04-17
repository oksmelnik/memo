import React from 'react'
import styled from 'styled-components'
import Aux from '../../../hoc/Aux'
import { Backdrop } from '../Backdrop/Backdrop'

const StyledModal = styled.div`
        transform: ${props => props.show ? 'translateY(0)' : 'translateY(-100hv)'};
        opacity: ${props => props.show ? '1' : '0'};
        display: ${props => props.show ? 'block' : 'none'};
        position: fixed;
        z-index: 500;
        background-color: white;
        width: 70%;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px black;
        padding: 16px;
        left: 15%;
        top: 40%;
        box-sizing: border-box;
        transition: all 0.3s ease-out;
        }
        @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
 
      }`

export const Modal = React.memo((props) => {
console.log('modal', props)
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <StyledModal show={props.show}>
                {props.children}
            </StyledModal>
        </Aux>
    )
},
    (prevProps, nextProps) => (prevProps.show === nextProps.show) &&
    prevProps.isSameModal === nextProps.isSameModal)
