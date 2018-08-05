import { createMuiTheme } from 'material-ui/styles';

//Theme
import deepPurple from 'material-ui/colors/deepPurple';
import deepOrange from 'material-ui/colors/deepOrange';

const theme = createMuiTheme({
    palette: {
        primary: {
            ...deepPurple
        },
        secondary: {
            ...deepOrange
        }
    }
});

export default theme;