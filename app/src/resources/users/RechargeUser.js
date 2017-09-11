import React from 'react';
import EditUser from './EditUser';
import ChangeBalanceDialog from './ChangeBalanceDialog';

export default (props) => {
    return (
        <EditUser resource="users" {...props}>
            <ChangeBalanceDialog {...props} />
        </EditUser>
    );
};
