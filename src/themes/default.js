import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiOutlinedInput: { root: { paddingRight: '0 !important', width: 200, height: '100%' } },
    MuiFormControl: {
      root: {
        minWidth: 200,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white',
      },
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiPopover: {
      paper: {
        minWidth: 200,
      },
    },
  },
});
