import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import AccountEdit from '../../components/AccountEdit';
import InstitutionForm from '@/components/InstitutionForm';
import VolunteerForm from '@/components/VolunteerForm';

const ProfileEdit = (props: any) => {

    const [value, setValue] = useState(0);

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const interestsList = [
        { value: '1', label: 'Interesse 1' },
        { value: '2', label: 'Interesse 2' },
        { value: '3', label: 'Interesse 3' },
    ]

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }


    return (
        <>
            <Typography mb={3} variant="h5">Configurações</Typography>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Editar Perfil" {...a11yProps(0)} />
                <Tab label="Conta" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
                {props.profile === 'institution' ? (
                    <InstitutionForm />
                ) : (
                    <VolunteerForm />
                )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AccountEdit profile={props.profile}/>
            </CustomTabPanel>
        </>
    );
}

export default ProfileEdit;