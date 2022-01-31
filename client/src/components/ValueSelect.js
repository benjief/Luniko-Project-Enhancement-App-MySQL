import React, { Component, Fragment } from "react";
import Select, { components, PlaceholderProps } from "react-select";

const valueOptions = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
    { value: 4, label: "Critical" }
];

const defaultStyles = {
    control: (base, state) => ({
        ...base,
        height: "50px",
        boxShadow: "2px 2px 4px rgba(43, 43, 43, 0.6)",
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

export default class ValueSelect extends Component<{}, State> {
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
                    name="values"
                    options={valueOptions}
                    components={{ Placeholder }}
                    placeholder={"Value"}
                    styles={defaultStyles}
                />
            </Fragment>
        );
    }
}