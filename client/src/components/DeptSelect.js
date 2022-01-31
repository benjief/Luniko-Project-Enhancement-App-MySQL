import React, { Component, Fragment } from 'react';
import Select, { components, PlaceholderProps } from 'react-select';

const deptOptions = [
    { value: "R", label: "Risk" },
    { value: "A", label: "Action" },
    { value: "I", label: "Issue" },
    { value: "D", label: "Decision" }
];

const defaultStyles = {
    control: (base, state) => ({
        ...base,
        height: "50px",
        boxShadow: "2px 2px 8px rgba(43, 43, 43, 0.6)",
        marginTop: "10px",
        border: state.isFocused ? 0 : 0,
        textAlign: "left",
        paddingLeft: "3px",
        marginBottom: "10px"
    }),
    placeholder: (base) => ({
        ...base,
        color: "rgb(189, 189, 189)"
    })
};

export default class DeptSelect extends Component<{}, State> {
    state: State = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
    };

    toggleClearable = () =>
        this.setState((state) => ({ isClearable: !state.isClearable }));
    toggleDisabled = () =>
        this.setState((state) => ({ isDisabled: !state.isDisabled }));
    toggleLoading = () =>
        this.setState((state) => ({ isLoading: !state.isLoading }));
    toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
    toggleSearchable = () =>
        this.setState((state) => ({ isSearchable: !state.isSearchable }));

    render() {
        const {
            toggleClearable,
            toggleDisabled,
            toggleLoading,
            toggleRtl,
            toggleSearchable,
        } = this;

        const { isClearable, isSearchable, isDisabled, isLoading, isRtl } =
            this.state;

        const Placeholder = (props: PlaceholderProps) => {
            return <components.Placeholder {...props} />;
        };

        return (
            <Fragment>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="departments"
                    options={deptOptions}
                    components={{ Placeholder }}
                    placeholder={"Department"}
                    styles={defaultStyles}
                />
            </Fragment>
        );
    }
}