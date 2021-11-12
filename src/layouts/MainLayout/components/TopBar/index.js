import { makeStyles, TextField, Typography } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import useActionDispatch from 'hooks/useActionDispatch';
import { setWsSymbolChangeAction } from 'actionCreators/websocketAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  autocomplete: {
    padding: 10,
  },
  textField: {
    background: '#fff',
    borderRadius: 5,
  },
}));

const filter = createFilterOptions();

function TopBar() {
  const classes = useStyles();

  const { currentSymbol, symbols } = useSelector(({ market }) => {
    const { currentSymbol, symbols } = market;
    return { currentSymbol, symbols };
  });

  const dispatches = useActionDispatch({ setWsSymbolChangeAction });

  return (
    <AppBar className={classes.root} position={'static'}>
      <Toolbar>
        <Typography className={classes.title}>
          {`${currentSymbol?.baseAsset ?? '----'} / ${
            currentSymbol?.quoteAsset ?? '----'
          }`}
        </Typography>
        <div>
          <Autocomplete
            className={classes.autocomplete}
            value={currentSymbol}
            onChange={(event, newValue) => {
              dispatches.setWsSymbolChangeAction(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            autoHighlight
            options={symbols}
            getOptionLabel={(option) => {
              if (!option) {
                return option;
              }

              return option.symbol;
            }}
            renderOption={(symbol) =>
              `${symbol.baseAsset}/${symbol.quoteAsset}`
            }
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField
                className={classes.textField}
                variant='outlined'
                {...params}
              />
            )}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
