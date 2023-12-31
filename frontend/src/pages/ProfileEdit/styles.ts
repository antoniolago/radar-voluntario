import { styled } from "@mui/material";

export const FormContainer = styled('form')`
    display: flex;
    flex-direction: column;

    .MuiFormControl-root { 
        margin-bottom: 1.5rem;
    }
    & .MuiInputBase-root {
        font-weight: 300 !important;
    }
`;


export const InputGroup = styled('div')`
    display: flex;
    > div {
        width: 50%;
    }
    > div:first-of-type {
        margin-right: 1rem;
    }
`

export const FooterButton = styled('div')`
    margin-top: 2em;
    text-align: right;
`

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

