import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Paper, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Favorite from '@mui/icons-material/Favorite';
import backend from '../../services/backend'
import './style.css'

export default function Dashboard() {
    const [file, setFile] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [asked, setAsked] = useState(false);

    const handleUploadFile = event => {
        setFile(event.target.files[0])
    }

    const askQuestion = async () => {
        const payload = {
            "question": question
        }
        const result = await backend.post('/chat', payload);

        setAnswer(result);
        setAsked(false)

        return result
    }

    const handleOnAskQuestion = async (event) => {
        event.preventDefault();
        setAsked(true)
        setAnswer('')
        console.log('question:', question)
        await askQuestion()
        console.log('answer:', answer)
    }

    const handleOnUpload = async (event) => {
        event.preventDefault();

        const file_data = new FormData();
        file_data.append('file', file);

        await backend.post('/upload', file_data);
    }

    return (
        <div>
            <div className='main-container'>
                <div className='container-left'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '65ch' },
                        }}
                        noValidate
                    >
                        <Typography color='white' align='justify'>
                            Bem vindo ao ANNA,
                            aqui você pode fazer o upload de documentos e convertar
                            com ele de forma natural, como ele fosse uma pessoa.
                            Nessa versão estamos disponibilizando apenas o upload
                            de um documento por vez, mas na próxima versão já
                            disponibilizaremos a possibilidade de chat com
                            múltiplos documentos.
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '150px', height: '50px' },
                        }}
                        noValidate
                        onSubmit={handleOnUpload}
                    >
                        <Button
                            variant="contained"
                            component="label"
                        >
                            <Typography>
                                SELECT FILE
                            </Typography>
                            <input
                                type="file"
                                hidden
                                onChange={handleUploadFile}
                            />
                        </Button>
                        <Button
                            type="submit"
                            variant='contained'
                            color='secondary'
                            style={{ width: '150px', height: '50px' }}>
                            <Typography>
                                Upload
                            </Typography>
                        </Button>
                    </Box>

                </div>
                <div className='container-right'>
                    <Card sx={{ p: 3 }}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '60ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            display='flex'
                            justifyContent='center'
                            flexDirection='column'
                            onSubmit={handleOnAskQuestion}
                        >
                            <TextField id="question"
                                label=""
                                variant="outlined"
                                name='question'
                                onChange={e => setQuestion(e.currentTarget.value)}
                            />
                        </Box>
                    </Card>

                    {
                        asked & answer.data === undefined ?
                            <Box
                                sx={{ display: 'flex', mt: 2 }}>
                                <CircularProgress />
                            </Box> : ""
                    }
                    {console.log(answer.data)}

                    {
                        answer.data !== undefined ?
                            <Card
                                sx={{ p: 3, mt: 2 }}
                                style={{ color: 'green', backgroundColor: 'ActiveCaption' }}>
                                <Typography>{answer.data}</Typography>
                            </Card> : ""
                    }
                </div>
            </div>
            <Paper sx={{
                marginTop: 'calc(10% + 60px)',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }} component="footer" square variant="outlined">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography>Feito com </Typography>
                    <Favorite sx={{ color: pink[500] }} />
                    <Typography>pelo <b>Leonardo Gerheim</b></Typography>
                </div>
            </Paper>
        </div>
    )
}