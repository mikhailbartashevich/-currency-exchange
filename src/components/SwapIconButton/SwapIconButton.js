import React from 'react';
import { withStyles } from '@material-ui/styles';
import { pure } from 'recompose';
import { Icon, IconButton } from '@material-ui/core';

const styles = {
  icon: {
    color: '#6d8aff',
  },
};

const SwapIconButtonRaw = props => {
  const { classes, ...other } = props;
  return (
    <IconButton size="small" {...other} className="SwapIconButton">
      <Icon className={classes.icon}>
        swap_vert
      </Icon>
    </IconButton>
  );
};

export const SwapIconButton = pure(withStyles(styles)(SwapIconButtonRaw));
