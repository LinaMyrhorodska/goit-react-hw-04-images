import { SearchBtn } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({onClick}) => {
    return (
        <SearchBtn type="button" onClick={onClick}>
            Load more
        </SearchBtn>
    )
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}