import * as React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const BackButton = (props: { redirectTo: string }) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div style={{ marginBottom: "20px" }}>
            <Button
                onClick={() => handleGoBack()}
                // component={RouterLink}
                // to={props.redirectTo} 
                variant="outlined" size="small" color="primary">
                Voltar
            </Button>
        </div>
    );
};

export default BackButton;