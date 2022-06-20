import "../style/HomePageRoutes.css";
import {Button, Table, TableBody, TableCell, TableRow, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import {matrixStyles} from "../style/matrixStyles";
import Switch from "@mui/material/Switch";
import {useNavigate} from "react-router-dom";

const constants = require("../others/constants");
const {postToGateway, getToGateway} = require("../others/utils");


const Contents = (props) => {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const [filteredRows, setFilteredRows] = useState([]);

  const [searchText, setSearchText] = useState("");

  const classes = matrixStyles();

  async function getContent() {
    let response = await getToGateway(constants.MEDIA_HOST + constants.CONTENT_URL);

    if (response.error !== undefined) {
      response = []
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

  async function handleDisabledSwitch(event,
                                      type,
                                      id) {
    let url = constants.MEDIA_HOST + constants.ENABLE_CONTENT_URL;

    if (!event.target.checked) {
      url = constants.MEDIA_HOST + constants.DISABLE_CONTENT_URL;
    }

    const requestBody = {
      contentType: type,
      contentId: id,
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
    const contentType = params.row
      .id
      .split('_')[0];

    const contentId = params.row
      .id
      .split('_')[1];

    return (
      <Switch
        checked={!params.row
          .blocked}

        onChange={async (e) => handleDisabledSwitch(e,
          contentType,
          contentId)}
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

  const renderButtonGetDetail = (params) => {
    const row = params.row;

    if (row.type === "canción") {
      return (
          <Button style={{float: 'right'}} onClick={async () => {
            navigate(constants.SONG_DETAIL_URL + "/" + row.id)
          }}> Ver detalle
          </Button>
      );
    }
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      headerClassName: classes.headerCell,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      headerClassName: classes.headerCell,
      flex: 0.4
    },
    {
      field: 'type',
      headerName: 'Tipo',
      headerClassName: classes.headerCell,
      flex: 0.4
    },
    {
      field: 'genre',
      headerName: 'Género',
      headerClassName: classes.headerCell,
      flex: 0.4,
    },
    {
      field: 'subscription',
      headerName: 'Suscripción',
      headerClassName: classes.headerCell,
      flex: 0.4,
    },
    {
      field: 'creationDate',
      headerName: 'Fecha de creación',
      headerClassName: classes.headerCell,
      flex: 0.4,
    },
    {
      field: 'details',
      headerName: 'Ver detalle',
      headerClassName: classes.headerCell,
      renderCell: renderButtonGetDetail,
      flex: 0.4,
    },
    {
      field: 'blocked',
      headerName: 'Activado',
      headerClassName: classes.headerCell,
      renderCell: renderDisableButton,
      flex: 0.15
    }
  ];

  return (
    <div>
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{width: 600}}>
                <TextField onChange={handleSearchText}
                           value={searchText}
                           margin="normal"
                           label="🔍"
                           style={{width: 500, backgroundColor: '#f5fcff', borderRadius: 5}}
                           size={"small"}
                           autoFocus>
                </TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div style={{width: '100%', minHeight: window.innerHeight}}>
        <DataGrid
          rows={filteredRows}
          autoHeight={true}
          classes={{headerCell: classes.headerCell, row: classes.row}}
          columns={columns}/>
      </div>
    </div>
  );
}

export {
  Contents
}
