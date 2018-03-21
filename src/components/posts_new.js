import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
    renderField(field) {
        // const {meta} = field;   // destruct field.meta to meta
        const {meta: { touched, error }} = field;   // destruct field.meta to meta, also destruct touched and error in meta
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}      //wire up all the eventhandlers which are wrapped in field to input
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this === component
        // console.log(this.props);
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}    //no() because renderTitleField will be called in some certain time point in future
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter a categories!";
    }
    if (!values.content) {
        errors.content = "Enter a content!";
    }

    // If errors is empty , the form is fine to submit
    // If errors has any props, redux form assumes form is invalid
    return errors;
}
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);

// //PostsEdit.js    Will merge the field to the above one
// export default reduxForm({
//     form: 'PostsNewForm'
// })(PostsNew);