import "../style/HomePageRoutes.css";
import { Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";

const constants = require("../others/constants");
const { postToGateway } = require("../others/utils");

async function enableKey(apiKey,
                         name,
                         description) {
    const requestBody = {
        "apiKey": constants.MY_API_KEY,
        "name": name,
        "description": description,
        "apiKeyToEnable": apiKey
    }

    const response = await postToGateway(constants.SERVICES_HOST + constants.API_KEY_UP_URL,
                                  requestBody);

    if (response.error !== undefined) {
        alert(response.error);
    } else {
        window.location
              .reload();
    }
}

async function disableKey(apiKey) {
    const requestBody = {
        apiKeyToDisable: apiKey,

        redirectTo: constants.SERVICES_HOST + constants.API_KEY_DOWN_URL,

        verbRedirect: "POST"
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
        alert(response.error);
    } else {
        window.location
            .reload();
    }
}

const changeBooleans = (response)  =>  {
    response.forEach( (x, i)  => {
        x.active = (x.active)
                    ? "activado"
                    : "desactivado";
    } );

    return response;
}

const renderDisableButton = (params) => {
    if (params.row
              .active === 'activado') {
        return (
            <Button onClick={ async () => {
                await disableKey(params.row
                                       .apiKey)
            } }
            >Desactivar
            </Button>
        );
    } else {
        return (
            <Button onClick={ async () => {
                await enableKey(params.row
                                      .apiKey)
            } }
            >Activar
            </Button>
        );
    }
}

const Services = (props) => {
    const [rows,
          setRows] = useState([]);

    const [filteredRows,
          setFilteredRows] = useState([]);

    const [apiName,
           setApiName] = useState("");

    const [apiDescription,
           setApiDescription] = useState("");

    const [searchText,
          setSearchText] = useState("");

    async function getServices() {
        let response = await fetch(constants.SERVICES_HOST + constants.SERVICES_URL
            + "?"
            + constants.API_KEY_QUERY_PARAM
            + constants.MY_API_KEY, {
                method: "GET",
                headers: constants.JSON_HEADER
            }
        ).then(response => response.json()
        ).catch(error => {
            return {
                error: error.toString()
            };
        } );

        if (response.error !== undefined) {
            response =  {
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
    useEffect( () => {
        const getServicesWrapper = async () => {
            const response = changeBooleans( await getServices() );

            setRows(response);
            setFilteredRows(response);
        };

        getServicesWrapper().then(r => r);
    }, [] );

    const handleApiName = (event) => {
        setApiName(event.target
                        .value);
    }

    const handleApiDescription = (event) => {
        setApiDescription(event.target
                               .value);
    }

    const handleSearchText = (event) => {
        const textInTextBox = event.target
                                   .value;

        setSearchText(textInTextBox);

        const newRows = rows.filter(row => {
            return Object.keys(row).some( (field) => {
                return row[field]
                        .toString()
                        .includes(textInTextBox);
            } );
        } );

        setFilteredRows(newRows);
    }

    const columns = [
        {
          field: 'name',
          headerName: 'Nombre',
          width: 200
        },
        {
            field: 'apiKey',
            headerName: 'API-KEY',
            width: 600
        },
        {
            field: 'active',
            headerName: 'Estado',
            width: 100
        },
        {
            field: 'creationDate',
            headerName: 'Fecha de creación',
            width: 200
        },
        {
            field: 'description',
            headerName: 'Descripción',
            width: 500
        },
        {
            field: 'button',
            headerName: '',
            width: 200,
            renderCell: renderDisableButton,
        }
    ];

    return(
        <div>
            <div>
                <br/>
            </div>

            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style = {{width: 600}}>
                                <TextField onChange = { handleSearchText }
                                           value = { searchText }
                                           margin="normal"
                                           label="🔍"
                                           style = {{width: 800}}
                                           autoFocus> </TextField>
                            </TableCell>

                            <TableCell>
                                <div className="vertical-line"/>
                            </TableCell>

                            <TableCell>
                                <TextField onChange = { handleApiName }
                                           value = { apiName }
                                           margin="normal"
                                           label="Nombre"
                                           autoFocus> </TextField>
                            </TableCell>

                            <TableCell>
                                <TextField onChange = { handleApiDescription }
                                           value = { apiDescription }
                                           margin="normal"
                                           label="Descripción"
                                           autoFocus> </TextField>
                            </TableCell>

                            <TableCell>
                                <Button onClick={ async () => {
                                    await enableKey(undefined,
                                                    apiName,
                                                    apiDescription)
                                } }
                                >Agregar servicio
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <div>
                <br/>
                <br/>
                <br/>
            </div>

            <div style={{ height: 1800, width: '100%' }}>
                <DataGrid
                    rows = {filteredRows}
                    columns = {columns}/>
            </div>
        </div>

    );
}

export {
    Services
}
