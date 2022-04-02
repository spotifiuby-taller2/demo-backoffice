import "../style/HomePageRoutes.css";
import { Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button} from '@mui/material';
import React, {useEffect, useState} from "react";

const constants = require("../others/constants");
const { postTo } = require("../others/utils");

async function enableKey(apiKey,
                         name,
                         description) {
    const requestBody = {
        "apiKey": constants.MY_API_KEY,
        "name": name,
        "description": description,
        "apiKeyToEnable": apiKey
    }

    const response = await postTo(constants.SERVICES_HOST + constants.API_KEY_UP_URL,
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
        "apiKey": constants.MY_API_KEY,
        "apiKeyToDisable": apiKey
    }

    const response = await postTo(constants.SERVICES_HOST + constants.API_KEY_DOWN_URL,
        requestBody
    );

    if (response.error !== undefined) {
        alert(response.error);
    } else {
        window.location
            .reload();
    }
}


const getRowsToRender = (response)  =>  {
    return response.map( (x, i)  => {
        let isActive = x.active
                        .toString();

        const apiKey = x.apiKey;

        let button;

        if (isActive === "activado") {
            button = (
                <Button onClick={ async () => {
                    await disableKey(apiKey)
                } }
                >Desactivar
                </Button>
            );
        } else {
            button = (
                <Button onClick={ async () => {
                    await enableKey(apiKey)
                } }
                >Activar
                </Button>
            );
        }

        return <TableRow key={i}>
            <TableCell>{x.name}</TableCell>
            <TableCell>{apiKey}</TableCell>
            <TableCell>{isActive}</TableCell>
            <TableCell>{x.creationDate}</TableCell>
            <TableCell>{x.description}</TableCell>
            <TableCell>{button}</TableCell>
        </TableRow>
    } )
}

const changeBooleans = (response)  =>  {
    response.forEach( (x, i)  => {
        x.active = (x.active)
                    ? "activado"
                    : "desactivado";
    } );

    return response;
}

const Services = (props) => {
    const [rowsToRender,
          setRowsToRender] = useState([]);

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
            setRowsToRender( getRowsToRender(response) );
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
                return row[field].includes(textInTextBox);
            } );
        } );

        setFilteredRows(newRows);
        setRowsToRender( getRowsToRender(newRows) );
    }

    return(
        <div>
            <div>
                <br/>
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
                <br/>
            </div>

            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>

                            <TableCell>API-KEY</TableCell>

                            <TableCell>Estado</TableCell>

                            <TableCell>Fecha de creación</TableCell>

                            <TableCell>Descripción</TableCell>

                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rowsToRender}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export {
    Services
}
