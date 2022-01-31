import React, { Component, Fragment, useState } from "react";
import Select, { components, PlaceholderProps } from "react-select";
import Axios from "axios";

const defaultStyles = {
    control: (base, state) => ({
        ...base,
        height: "50px",
        boxShadow: "2px 2px 4px rgba(43, 43, 43, 0.6)",
        border: state.isFocused ? 0 : 0,
        textAlign: "left",
        paddingLeft: "3px"
    }),
    placeholder: (base) => ({
        ...base,
        color: "rgb(189, 189, 189)"
    })
};

export default class IndentifierSelect extends Component<{}, State>{
    state: State = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
        identifierOptions: []
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

        const { isClearable, isSearchable, isDisabled, isLoading, isRtl, identifierOptions } =
            this.state;

        const Placeholder = (props: PlaceholderProps) => {
            return <components.Placeholder {...props} />;
        };

        return (
            <Fragment>
                <Select
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="identifiers"
                    options={identifierOptions}
                    components={{ Placeholder }}
                    placeholder={"Add Identifiers"}
                    styles={defaultStyles}
                />
            </Fragment>
        );
    }
}
