import React from 'react';
import { List, Datagrid, Filter, DateInput, SelectInput } from 'admin-on-rest';
import moment from 'moment';

const TransactionsFilter = (props) => {
    return (
        <Filter {...props} filterValues={{
            datetime_from: moment().startOf('month').toDate(),
            datetime_to: moment().toDate()
        }}>
            <DateInput source="datetime_from" alwaysOn />
            <DateInput source="datetime_to" alwaysOn />
            <SelectInput source="transaction_type" choices={[
                { id: 'payment', name: 'Payment' },
                { id: 'coupon', name: 'Coupon' },
                { id: 'inGamePurchase', name: 'In game purchase' },
                { id: 'internal', name: 'Internal' },
                { id: 'cancellation', name: 'Cancellation' }
            ]} />
        </Filter>
    );
};

export default (props) => {
    return (
        <List {...props} filters={<TransactionsFilter />}>
            <Datagrid>

            </Datagrid>
        </List>
    );
};