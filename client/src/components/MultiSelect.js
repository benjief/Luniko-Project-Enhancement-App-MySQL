import React, { Component, Fragment, useEffect, useState } from "react";
import Select, { components, PlaceholderProps } from "react-select";

function MultiSelect({
    name = "",
    placeholder = "",
    multiSelectOptions = [],
    selectedValues = [] }) {
    const defaultStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "50px",
            boxShadow: "2px 2px 8px rgba(43, 43, 43, 0.6)",
            border: state.isFocused ? 0 : 0,
            textAlign: "left",
            paddingLeft: "3px",
            marginBottom: "10px"
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgb(189, 189, 189)"
        }),
    };

    const Placeholder = (props: PlaceholderProps) => {
        return <components.Placeholder {...props} />;
    };

    const handleOnChange = (event) => {
        if (event[0]) {
            let tempArray = [];
            for (let i = 0; i < event.length; i++) {
                tempArray.push(event[i].value);
            }
            selectedValues(tempArray);
        }
    }

    return (
        <Fragment>
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                isMulti
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name={name}
                components={{ Placeholder }}
                placeholder={placeholder}
                styles={defaultStyles}
                options={multiSelectOptions}
                onChange={(event) => handleOnChange(event)}
            />
        </Fragment>
    );
}

export default MultiSelect;