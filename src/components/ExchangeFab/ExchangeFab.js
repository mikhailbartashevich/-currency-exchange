import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    background: '#d80091',
    width: '100%',
    height: '30px',
    color: 'white',
    textTransform: 'none',
  },
};

const ExchangeFabRaw = props => {
  const { classes, color, ...other } = props;
  return (
    <Fab
      color="secondary"
      className={classes.root}
      classes={{ disabled: classes.disabled }}
      {...other}
    />
  );
};

export const ExchangeFab = withStyles(styles)(ExchangeFabRaw);
