import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { CardActions } from 'material-ui/Card';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import FlatButton from 'material-ui/FlatButton';
import { openModal as openModalAction } from '../../redux/modal';
import { ListButton } from 'admin-on-rest';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const cardActionsStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const mapDispatchToProps = (dispatch) => ({
    openUserChangeBalance() {
        dispatch(openModalAction('userChangeBalance'));
    }
});

const EditUserActions = ({ location: { pathname }, basePath, refresh, openUserChangeBalance }) => {
    return (
        <CardActions style={cardActionsStyle}>
            {/* <FlatButton primary label="Change balance" onClick={openUserChangeBalance} icon={<AccountBalanceWallet />} /> */}
            <FlatButton
                primary
                label="Change balance"
                icon={<AccountBalanceWallet />}
                containerElement={<Link to={`${pathname}/recharge`} />}
                style={{ overflow: 'inherit' }}/>
            <ListButton basePath={basePath} />
            <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
        </CardActions>
    );
};

const enhance = compose(
    connect(null, mapDispatchToProps),
    withRouter
);

export default enhance(EditUserActions);
