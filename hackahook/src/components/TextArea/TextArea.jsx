import { useState } from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import DotsBootcamp from '../DotsBootcamp/DotsBootcamp';
import SendIcon from '@mui/icons-material/Send';

const TextArea = (props) => {
    // por alguna razon no me capta el prop de un prop
    const wrapperHandleEditar = () => props.handleEditar();
    const wrapperHandleBorrar = () => props.handleBorrar();

    return (
        <Paper elevation={1} sx={{ p: 4, m: 2 }}>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h5" component="h1">
                        {props.title}
                    </Typography>
                    {
                        (props.showEdition && props.enterprise) ?
                            <DotsBootcamp
                                index={props.index}
                                enterprise={props.enterprise}
                                handleEditar={wrapperHandleEditar}
                                handleBorrar={wrapperHandleBorrar}
                            />
                            :
                            <></>
                    }

                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    sx={{ textAlign: { sm: "right" } }}
                >
                    <Typography
                        variant="subtitle2"
                        component="h3"
                        sx={{
                            textAlign: 'left',
                        }}>
                        {props.subtitle}
                    </Typography>
                    {
                        props.enterprise ? <></>
                            :
                            <Button onClick={() => props.handleOpen(props.index)} size="small" variant="contained" endIcon={<SendIcon />}>
                                {props.btnText}
                            </Button>
                    }

                </Grid>
            </Grid>
        </Paper>
    );
}

export default TextArea;