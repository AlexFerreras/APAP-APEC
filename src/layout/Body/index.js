import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Form from '../../components/Form/index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const padding = {
    padding: '10px 10px 10px 10px',
}

const Body = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
        <Paper className={classes.paper}>
            <div style={padding}>
                <Form />
            </div>
        </Paper>
    </Grid>
  )
}

export default Body;
