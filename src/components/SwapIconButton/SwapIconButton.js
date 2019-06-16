import React from 'react';
import { withStyles } from '@material-ui/styles';
import { pure } from 'recompose';
import { Icon, IconButton } from '@material-ui/core';

const styles = {
  root: {
    color: '#446dd2',
  },
};

const SwapIconButtonRaw = props => {
  const { classes, color, ...other } = props;
  return (
    <IconButton size="small" {...other} className="SwapIconButton">
      <Icon className={classes.root}>
        swap_vert
      </Icon>
    </IconButton>
  );
};

export const SwapIconButton = pure(withStyles(styles)(SwapIconButtonRaw));
