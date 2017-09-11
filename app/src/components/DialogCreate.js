import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, FlatButton } from 'material-ui'
import { Create, SimpleForm } from 'admin-on-rest';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate, crudCreate as crudCreateAction } from 'admin-on-rest';

const mapStateToProps = (state, props) => {
    return {
        open: props.open ? Boolean(props.open) : Boolean(state.modalReducer[props.modalName]),
        record: (state.form['record-form'] || {}).values
    };
};
class CreateDialog extends Create {
    getBasePath() {
        const { location } = this.props;
        return location.pathname.split('/').slice(0, -1).join('/');
    }

    defaultRedirectRoute() {
        const { hasShow, hasEdit } = this.props;
        if (hasEdit) return 'edit';
        if (hasShow) return 'show';
        return 'list';
    }

    getRedirectPath() {
        return typeof this.props.redirect === 'undefined' ? this.defaultRedirectRoute() : this.props.redirect
    }

    save = () => {
        const record = this.props.record;
        const redirect = this.getRedirectPath();
        this.props.crudCreate(this.props.resource, record, this.getBasePath(), redirect);
        this.props.onSave();
    }

    render() {
        const { children, resource, basePath, translate, onRequestClose } = this.props;
        const actions = [
            <FlatButton label="Cancel" onClick={onRequestClose} />,
            <FlatButton label="Save" primary onClick={this.save} />
        ];
        return (
            <Dialog {...this.props} actions={actions} modal={false}>
                <SimpleForm
                    toolbar={null}
                    save={this.save}
                    resource={resource}
                    basePath={basePath}
                    record={{}}
                    translate={translate}
                    redirect={this.getRedirectPath()}
                    defaultValue={this.props.defaultValue}>
                    {children}
                </SimpleForm>
            </Dialog>
        );
    }
}

CreateDialog.propTypes = Object.assign({}, Dialog.propTypes, Create.propTypes, {
    modalName: PropTypes.string.isRequired,
    record: PropTypes.object,
    onSave: PropTypes.func
});

const enhance = compose(
    connect(mapStateToProps, {
        crudCreate: crudCreateAction
    }),
    translate
);

export default enhance(CreateDialog);
