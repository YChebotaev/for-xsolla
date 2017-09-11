import React from 'react';
import { connect } from 'react-redux';
import DialogCreate from '../../components/DialogCreate';
import { closeModal as closeModalAction } from '../../redux/modal';
import { DisabledInput, NumberInput, TextInput } from 'admin-on-rest';

const MODAL_NAME = 'userChangeBalance';

const mapDispatchToProps = (dispatch, props) => {
    return {
        closeModal() {
            dispatch(closeModalAction(MODAL_NAME));
        },
        handleSave() {
            dispatch(closeModalAction(MODAL_NAME));
        }
    };
};

const ChangeBalanceDialog = (props) => {
    return (
        <DialogCreate
            open={true}
            onSave={props.handleSave}
            location={props.location}
            modalName={MODAL_NAME}
            resource="user_balance"
            title="Change balance"
            onRequestClose={props.closeModal}
            redirect={props.record.user_id}
            defaultValue={{
                user_id: props.record.user_id,
                amount: props.record.balance
            }}>
                <DisabledInput source="user_id" />
                <NumberInput source="amount" />
                <TextInput source="comment" />
        </DialogCreate>
    );
};

export default connect(null, mapDispatchToProps)(ChangeBalanceDialog);
