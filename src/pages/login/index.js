import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import './style.css'


export default function Login() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/dashboard");
    }

    return (
        <div className='main-container'>
            <div className='login-container'>
                <Card sx={{ p: 3, pt: 10, pb: 8 }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        display='flex'
                        justifyContent='center'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <TextField id="outlined-basic" label="Username" variant="outlined" />
                        <TextField id="outlined-basic" type="password" label="Password" variant="outlined" />
                        <Button
                            variant="contained"
                            style={{ width: '350px', height: '50px' }}
                            onClick={handleClick}
                        >
                            Login
                        </Button>
                        <Typography align='center'><Link href="#">forgot password?</Link></Typography>
                    </Box>
                </Card>
            </div>
        </div >
    )
}