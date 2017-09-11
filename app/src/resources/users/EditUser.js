import React from 'react';
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    SelectInput,
    BooleanInput,
    email
} from 'admin-on-rest';
import EditUserActions from './EditUserActions';

const UserTitle = ({ record }) => {
    return <span>User {record ? record.id : ''}</span>;
};

export default (props) => {
    return (
        <Edit title={<UserTitle />} actions={<EditUserActions />} {...props}>
            <SimpleForm>
                <DisabledInput source="user_id" />
                <TextInput source="user_name" />
                <TextInput source="user_custom" />
                <TextInput source="email" validate={email} />
                <DateInput source="register_date" />
                <DisabledInput source="balance" />
                <DisabledInput source="wallet_amount" />
                <SelectInput source="wallet_currency" choices={[
                    { id: 'USD', name: 'USD' }
                ]} />
                <BooleanInput source="enabled" />
                {
                    props.children
                }
            </SimpleForm>
        </Edit>
    );
};
