import Grid from "@material-ui/core/Grid";

const CenteredGridContainer = ({ children, ...props }: { children: React.ReactNode }) => {
    return (
        <Grid
            container
            style={{ width: '100%', height: '100%' }}
            alignContent="center"
            justifyContent="center"
            {...props}
        >
            {children}
        </Grid>
    );
};

export default CenteredGridContainer;