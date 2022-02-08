import React, { Fragment } from "react";
import Select, { components, PlaceholderProps } from "react-select";

function SingleSelect({
    name = "", placeholder = "",
    singleSelectOptions = [],
    selectedValue = "" }) {
    const defaultStyles = {
        control: (base, state) => ({
            ...base,
            height: "50px",
            boxShadow: "2px 2px 4px rgba(43, 43, 43, 0.6)",
            border: state.isFocused ? 0 : 0,
            textAlign: "left",
            paddingLeft: "3px",
            marginBottom: "20px"
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgb(189, 189, 189)"
        })
    };

    const Placeholder = (props: PlaceholderProps) => {
        return <components.Placeholder {...props} />;
    };

    const handleOnChange = (event) => {
        if (event) {
            selectedValue(event.value);
        }
    }

    return (
        <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name={name}
                components={{ Placeholder }}
                placeholder={placeholder}
                styles={defaultStyles}
                options={singleSelectOptions}
                onChange={(event) => handleOnChange(event)}
            />
        </Fragment>
    );
}

export default SingleSelect;