import "../style/HomePageRoutes.css";
import { Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button} from '@mui/material';
import {useEffect, useState} from "react";

const constants = require("../others/constants");
const { postTo } = require("../others/utils");

async function getServices() {
    const response = await fetch(constants.SERVICES_HOST + constants.SERVICES_URL
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
        return {
            "name": "",
            "apiKey": "",
            "creationDate": "",
            "description": ""
        }
    }

    return response;
}

async function enableKey(apiKey) {
    const requestBody = {
        "apiKey": constants.MY_API_KEY,
        "apiKeyToEnable": apiKey
    }

    const response = await postTo(constants.SERVICES_HOST + constants.API_KEY_UP_URL,
                                  requestBody
                           ).catch(error => {
                                return {
                                    error: error.toString()
                                }
                           } );

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
                           ).catch(error => {
                                return {
                                    error: error.toString()
                                }
                           } );

    if (response.error !== undefined) {
        alert(response.error);
    } else {
        window.location
              .reload();
    }
}

const Services = (props) => {
    let [rows, setRows] = useState([]);

    // Component did mount
    useEffect( () => {
        const getServicesWrapper = async () => {
            const response = await getServices();

            const responseRows = response.map( (x, i)  => {
                const isActive = x.active
                                  .toString();

                const apiKey = x.apiKey;

                let button;

                if (isActive === "true") {
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

            setRows(responseRows);
        };

        getServicesWrapper().then(r => r);
    }, [] );

    return(
        <div>
            <div>
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
                            <TableCell>Activa</TableCell>
                            <TableCell>Fecha de creación</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}

export {
    Services
}
