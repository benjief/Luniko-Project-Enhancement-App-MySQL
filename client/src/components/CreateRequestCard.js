import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { yellow } from '@mui/material/colors';
// import { green } from '@mui/material/colors';
// import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { color } from '@mui/system';
import MaterialSingleSelect from './MaterialSingleSelect';
import MaterialSingleSelectWithValue from './MaterialSingleSelectWithValue';
import MaterialTextField from './MaterialTextField';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UpdateOwnedRequestCard({
    uid = "",
    scopeTypeOptions = [],
    departmentOptions = [],
    valueOptions = [],
    identifierOptions = [],
    updatedCompany = "",
    selectedScopeType = "",
    selectedDepartment = "",
    updatedDescription = "",
    selectedValue = 0,
    selectedIdentifiers = [],
    requestToSubmit = ""
}) {
    const [expanded, setExpanded] = React.useState(true);

    const handleOnChangeCompany = (updatedText) => {
        updatedCompany(updatedText);
    }

    const handleOnSelectScopeType = (valueFromSelector) => {
        selectedScopeType(valueFromSelector);
    }

    const handleOnSelectDepartment = (valueFromSelector) => {
        selectedDepartment(valueFromSelector);
    }


    const handleOnChangeComments = (updatedText) => {
        updatedComments(updatedText);
    }

    const handleOnChangeDescription = (updatedText) => {
        updatedDescription(updatedText);
    }

    const handleOnChangeValue = (valueFromSelector) => {
        selectedValue(valueFromSelector);
    }

    const handleOnChangeIdentifiers = (valuesFromSelector) => {
        selectedIdentifiers(valuesFromSelector);
    }

    const handleSubmitRequest = () => {
        requestToSubmit(uid);
    }

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    //     // cardColor === "var(--lunikoMidGrey)" ? setCardColor("var(--lunikoOrange)") : setCardColor("var(--lunikoMidGrey)");
    // };

    return (
        <Card
            sx={{
                minWidth: 350,
                maxWidth: 350,
                maxHeight: 589,
                overflowY: "scroll",
                borderRadius: "10px",
                boxShadow: "2px 2px 6px rgba(43, 43, 43, 0.6)",
                transition: "0.5s",
                backgroundColor: "var(--lunikoOrange)",
                marginBottom: "20px"
            }}>
            <CardHeader
                titleTypographyProps={{ color: "rgba(0, 0, 0, 0.7)", fontFamily: "'Raleway', Verdana, Geneva, Tahoma, sans-serif", fontSize: "10.5pt" }}
                // subheaderTypographyProps={{ color: "rgba(0, 0, 0, 0.7)", fontFamily: "'Raleway', Verdana, Geneva, Tahoma, sans-serif", fontSize: "10.5pt" }}
                // avatar={
                //     <Avatar sx={{
                //         bgcolor: "var(--lunikoBlue)"
                //     }}
                //         aria-label="status">
                //         {statusAbbreviation}
                //     </Avatar>
                // }
                title={[<strong>Request ID </strong>, <strong>{id}</strong>]}
            />
            {/* < CardActions
                disableSpacing
                style={{ justifyContent: "center", height: "40px", padding: 0, paddingBottom: "10px" }}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{ marginLeft: 0 }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions > */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <Typography
                        paragraph>
                        <strong>Updatable Fields</strong>
                    </Typography> */}
                    <MaterialTextField
                        label="Company Name"
                        helperText="Required for rejection"
                        placeholder="Reason for Rejection"
                        defaultValue={reasonRejected}
                        inputValue={handleOnChangeReasonRejected}
                        multiline={false}>
                    </MaterialTextField>
                    <MaterialSingleSelect
                        label="Status"
                        placeholder="Status"
                        defaultValue={status}
                        singleSelectOptions={statusOptions}
                        selectedValue={handleOnSelectStatus}>
                    </MaterialSingleSelect>
                    <MaterialSingleSelect
                        label="Effort"
                        placeholder="Effort"
                        defaultValue={effort}
                        singleSelectOptions={effortOptions}
                        selectedValue={handleOnSelectEffort}>
                    </MaterialSingleSelect>
                    <MaterialSingleSelectWithValue
                        label="Approved"
                        placeholder="Approved"
                        defaultValue={approved}
                        value={approvedValue}
                        singleSelectOptions={approvalOptions}
                        selectedValue={handleOnSelectApproved}
                        isDisabled={approveDisabled}>
                    </MaterialSingleSelectWithValue>
                    <MaterialSingleSelectWithValue
                        label="Rejected"
                        placeholder="Rejected"
                        defaultValue={rejected}
                        value={rejectedValue}
                        singleSelectOptions={approvalOptions}
                        selectedValue={handleOnSelectRejected}
                        isDisabled={rejectDisabled}>
                    </MaterialSingleSelectWithValue>
                    <MaterialTextField
                        className="comments-text-field"
                        label="Comments"
                        placeholder="Comments"
                        defaultValue={comments}
                        inputValue={handleOnChangeComments}>
                    </MaterialTextField>
                    <button
                        className="submit-request-button"
                        onClick={handleSubmitRequest}>
                        Submit
                    </button>
                </CardContent>
            </Collapse>
        </Card >
    );
}