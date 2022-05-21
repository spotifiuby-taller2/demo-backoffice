import "../style/HomePageRoutes.css";
import {Box, Button, Modal, Table, TableBody, TableCell, TableRow, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import {matrixStyles} from "../style/matrixStyles";
import Switch from "@mui/material/Switch";

const constants = require("../others/constants");
const {postToGateway, getToGateway} = require("../others/utils");


const Services = (props) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [apiName, setApiName] = useState("");
  const [apiDescription, setApiDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [addAdminModalVisible, setAddAdminModalVisible] = useState(false);

  const classes = matrixStyles();

  async function getServices() {
    let response = await getToGateway(constants.SERVICES_HOST + constants.SERVICES_URL,
      "?" + constants.API_KEY_QUERY_PARAM + constants.MY_API_KEY);

    if (response.error !== undefined) {
      response = {
        "name": "",
        "apiKey": "",
        "active": "",
        "creationDate": "",
        "description": ""
      }
    }

    return response;
  }

  // Component did mount
  useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    const getServicesWrapper = async () => {
      const response = await getServices();
      setRows(response);
      setFilteredRows(response);
    };

    getServicesWrapper().then(r => r);
  }, []);

  async function addService(name, description) {
    if (name === "" || name === undefined || description === undefined) {
      alert("Por favor, complete los campos del nuevo servicio.");
      return;
    }
    const requestBody = {
      name: name,
      description: description,
      redirectTo: constants.SERVICES_HOST + constants.API_KEY_CREATE_SERVICE_URL
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      window.location.reload();
    }
  }

  async function handleDisabledSwitch(event, apiKey) {
    let url = constants.SERVICES_HOST + constants.API_KEY_DOWN_URL;
    if (event.target.checked) url = constants.SERVICES_HOST + constants.API_KEY_UP_URL;
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
        checked={params.row.active}
        onChange={async (e) => handleDisabledSwitch(e, params.row.apiKey)}
        inputProps={{'aria-label': 'controlled'}}
      />
    );
  }

  const handleApiName = (event) => {
    setApiName(event.target.value);
  }

  const handleApiDescription = (event) => {
    setApiDescription(event.target.value);
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

  const handlerModalOpen = () => setAddAdminModalVisible(true);
  const handlerModalClose = () => setAddAdminModalVisible(false);

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerClassName: classes.headerCell,
      width: 200
    },
    {
      field: 'apiKey',
      headerName: 'API-KEY',
      headerClassName: classes.headerCell,
      width: 600
    },
    {
      field: 'creationDate',
      headerName: 'Fecha de creación',
      headerClassName: classes.headerCell,
      width: 250
    },
    {
      field: 'description',
      headerName: 'Host',
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
              <TableCell>
                <Button variant="contained" style={{float: 'right'}} onClick={handlerModalOpen}>
                  Agregar servicio
                </Button>
                <Modal
                  open={addAdminModalVisible}
                  onClose={handlerModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={{flexDirection: 'column', display: 'flex'}}
                       style={{
                         backgroundColor: 'white',
                         borderRadius: 10,
                         height: 200,
                         width: 400,
                         alignItems: 'center',
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         border: '2px solid #000',
                         boxShadow: 100
                       }}>
                    <TextField onChange={handleApiName}
                               value={apiName}
                               margin="normal"
                               label="Nombre"
                               size="small"
                               style={{width: 300, marginTop: 25}}
                               autoFocus
                    >
                    </TextField>
                    <TextField onChange={handleApiDescription}
                               value={apiDescription}
                               margin="normal"
                               label="Host"
                               size="small"
                               style={{width: 300}}
                               autoFocus
                    >
                    </TextField>
                    <Button onClick={() => addService(apiName, apiDescription)} style={{width: 300, marginTop: 10}}>
                      Agregar servicio
                    </Button>
                  </Box>
                </Modal>
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
  Services
}
