import { Typography } from '@mui/material';

const Header = ({ content }) => {

    return <Typography
        variant="subtitle1"
        align='center'
        borderBottom="solid 1px"
        paddingBottom="20px"
        fontWeight="bold">
        {content}
    </Typography>;
};

export default Header;