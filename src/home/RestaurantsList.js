import React, {useEffect, useState} from "react";
import {
    Button,
    Table, TableBody, TableCell, TableRow, TextField,
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getTo} from "../others/utils";
import * as constants from "../others/constants";
import {useNavigate} from "react-router-dom";

const RestaurantsList = (props) => {
    const navigate = useNavigate();

    const [rows,
        setRows] = useState([]);

    const [filteredRows,
        setFilteredRows] = useState([]);

    const [searchText,
        setSearchText] = useState("");

    const renderGetPlates = (params) => {
        return (
            <Button onClick={ async () => {
                navigate(constants.RESTAURANT_URL + "/"
                                                  + params.row
                                                           .id
                                                  + constants.PLATES_URL)
            } }>Ver platos
            </Button>
        );
    }

    async function getRestaurants() {
        let response = await getTo(constants.BACK_HOST + constants.RESTAURANTS_LIST_URL);

        if (response.error !== undefined) {
            // Column structure
            return {
                "id": "0",
                "name": ""
            }
        }

        return response.restaurants;
    }

    // Component did mount
    useEffect( () => {
        document.body
            .style
            .backgroundColor = '#f9f6f4';

        const getServicesWrapper = async () => {
            const response = await getRestaurants();

            setRows(response);

            setFilteredRows(response);
        };

        getServicesWrapper().then(r => r);
    }, [] );

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
            field: 'plates button',
            headerName: '',
            width: 200,
            renderCell: renderGetPlates,
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
    RestaurantsList
}
