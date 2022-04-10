import React, {useEffect, useState} from "react";
import {
    Button,
    Table, TableBody, TableCell, TableRow, TextField,
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getSHAOf, getToGateway, postToGateway} from "../others/utils";
import * as constants from "../others/constants";

async function enableUser(userId,
                         name,
                         password,
                         check) {
    if (check) {
        if (password === "" || name === "") {
            alert("Por favor, complete los campos del nuevo admin.");
            return;
        }
    }

    const hashedPassword = password === undefined
                           ? undefined
                           : getSHAOf( getSHAOf( password ) );

    const requestBody = {
        email: name,

        password: hashedPassword,

        idToUnlock: userId,

        redirectTo: constants.USERS_HOST + constants.USERS_UNLOCK_URL
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
        alert(response.error);
    } else {
        window.location
            .reload();
    }
}

async function disableUser(userId) {
    const requestBody = {
        idToBlock: userId,

        redirectTo: constants.USERS_HOST + constants.USERS_BLOCK_URL,
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
        x.isBlocked = (x.isBlocked)
            ? "bloqueado"
            : "activo";

        x.isAdmin = (x.isAdmin)
            ? "admin"
            : "no admin";
    } );

    return response;
}

const renderDisableButton = (params) => {
    if (params.row
              .isBlocked === 'bloqueado') {
        return (
            <Button onClick={ async () => {
                await enableUser(params.row
                                        .id)
            } }
            >Desbloquear
            </Button>
        );
    } else {
        return (
            <Button onClick={ async () => {
                await disableUser(params.row
                                        .id)
            } }
            >Bloquear
            </Button>
        );
    }
}

const renderGetProfile = (params) => {
    return (
        /* <Button onClick={ async () => {
            await getProfileOf(params.row
                .id)
        } } */
        <Button>Ver perfil
        </Button>
    );

}

const UsersList = (props) => {
    const [rows,
        setRows] = useState([]);

    const [filteredRows,
        setFilteredRows] = useState([]);

    const [userName,
        setUserName] = useState("");

    const [userPassword,
        setUserPassword] = useState("");

    const [searchText,
        setSearchText] = useState("");

    async function getUsers() {
        let response = await getToGateway(constants.USERS_HOST + constants.USERS_LIST_URL,
                                          "?" + constants.API_KEY_QUERY_PARAM
                                          + constants.MY_API_KEY);

        if (response.error !== undefined) {
            return {
                "id": "",
                "email": "",
                "isAdmin": "",
                "isBlocked": "",
            }
        }

        return response.users;
    }

    // Component did mount
    useEffect( () => {
        const getServicesWrapper = async () => {
            const response = changeBooleans( await getUsers() );

            setRows(response);
            setFilteredRows(response);
        };

        getServicesWrapper().then(r => r);
    }, [] );

    const handleUserName = (event) => {
        setUserName(event.target
            .value);
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target
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
            field: 'id',
            headerName: 'ID',
            width: 400
        },
        {
            field: 'email',
            headerName: 'Correo',
            width: 400
        },
        {
            field: 'isAdmin',
            headerName: 'Admin',
            width: 100
        },
        {
            field: 'isBlocked',
            headerName: 'Bloqueado',
            width: 200
        },
        {
            field: 'activation button',
            headerName: '',
            width: 200,
            renderCell: renderDisableButton,
        },
        {
            field: 'profile button',
            headerName: '',
            width: 200,
            renderCell: renderGetProfile,
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
                                <TextField onChange = { handleUserName }
                                           value = { userName }
                                           margin="normal"
                                           label="Email"
                                           autoFocus> </TextField>
                            </TableCell>

                            <TableCell>
                                <TextField onChange = { handleUserPassword }
                                           value = { userPassword }
                                           margin="normal"
                                           label="Password"
                                           type="password"
                                           autoFocus> </TextField>
                            </TableCell>

                            <TableCell>
                                <Button onClick={ async () => {
                                    await enableUser(undefined,
                                                    userName,
                                                    userPassword,
                                                    true)
                                } }
                                >Crear admin
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
    UsersList
}
