import React from 'react';
import { List, Datagrid, TextField, EmailField, DateField, BooleanField, EditButton } from 'admin-on-rest';

export default (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <EditButton basePath="/users" />
                <TextField source="user_id" />
                <TextField source="user_name" />
                <TextField source="user_custom" />
                <EmailField source="email" />
                <DateField source="register_date" />
                <TextField source="balance" />
                <TextField source="wallet_amount" />
                <TextField source="wallet_currency" />
                <BooleanField source="enabled" />
            </Datagrid>
        </List>
    );
};
