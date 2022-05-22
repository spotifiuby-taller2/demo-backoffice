import "../style/HomePageRoutes.css";
import {Table,
        TableBody,
        TableCell,
        TableRow,
        TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import {matrixStyles} from "../style/matrixStyles";
import Switch from "@mui/material/Switch";

const constants = require("../others/constants");
const {postToGateway, getToGateway} = require("../others/utils");


const Contents = (props) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const classes = matrixStyles();

  async function getContent() {
    let response = await getToGateway(constants.MEDIA_HOST + constants.CONTENT_URL);

    if (response.error !== undefined) {
      response = {
        "name": "",
        "genre": "",
        "type": "",
        "active": ""
      }
    }

    return response;
  }

  // Component did mount
  useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    const getServicesWrapper = async () => {
      const response = await getContent();
      setRows(response);
      setFilteredRows(response);
    };

    getServicesWrapper().then(r => r);
  }, []);

  async function handleDisabledSwitch(event, apiKey) {
    let url = constants.MEDIA_HOST + constants.ENABLE_CONTENT_URL;

    if (event.target.checked) {
      url = constants.MEDIA_HOST + constants.DISABLE_CONTENT_URL;
    }

    const requestBody = {
      apiKeyToChange: apiKey,
      redirectTo: url
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      window.location.reload();
    }
  }

  const renderDisableButton = (params) => {
    return (
      <Switch
        checked={params.row
                       .active}
        onChange={async (e) => handleDisabledSwitch(e, params.row
                                                             .apiKey)}
        inputProps={{'aria-label': 'controlled'}}
      />
    );
  }

  const handleSearchText = (event) => {
    const textInTextBox = event.target.value;

    setSearchText(textInTextBox);

    const lowerText = textInTextBox.toLowerCase();

    const newRows = rows.filter(row => {
      return Object.keys(row).some((field) => {
        return row[field].toString()
                         .toLowerCase()
                         .includes(lowerText);
      });
    });

    setFilteredRows(newRows);
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerClassName: classes.headerCell,
      width: 200
    },
    {
      field: 'genre',
      headerName: 'Género',
      headerClassName: classes.headerCell,
      width: 200
    },
    {
      field: 'type',
      headerName: 'Tipo',
      headerClassName: classes.headerCell,
      width: 200
    },
    {
      field: 'active',
      headerName: 'Estado',
      headerClassName: classes.headerCell,
      width: 175,
      renderCell: renderDisableButton
    }
  ];

  return (
    <div>
      <div>
        <br/>
      </div>

      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{width: 600}}>
                <TextField onChange={handleSearchText}
                           value={searchText}
                           margin="normal"
                           label="🔍"
                           style={{width: 500}}
                           size={"small"}
                           autoFocus>
                </TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div style={{height: 1800, width: '100%'}}>
        <DataGrid
          rows={filteredRows}
          classes={{headerCell: classes.headerCell, row: classes.row}}
          columns={columns}/>
      </div>
    </div>
  );
}

export {
  Contents
}
