import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";

export const Spinner = () => {
    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 30 }}>
                <CircularProgress size={50} />
            </Box>
        </Container>
    );
}