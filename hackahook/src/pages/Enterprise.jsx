import { Container } from "@mui/material"
import TextArea from "../components/TextArea/TextArea"
import Paper from '@mui/material/Paper';

const Enterprise = () => {
       return (
        <Container container fullWidth="xs">
            <Paper elevation={8} sx={{ p: 4 }}>
                <TextArea title="Bootcamp" subtitle="descripción" />
            </Paper>
        </Container>
    )
}


export default Enterprise;