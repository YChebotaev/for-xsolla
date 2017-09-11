import React from 'react';
import { Create, SimpleForm, TextInput, email } from 'admin-on-rest';
import nanoid from 'nanoid';

export default (props) => {
    return (
        <Create title="Create new user" {...props}>
            <SimpleForm defaultValue={{
                user_id: nanoid()
            }}>
                <TextInput source="user_name" />
                <TextInput source="user_custom" />
                <TextInput source="email" validate={email} />
            </SimpleForm>
        </Create>
    );
};
