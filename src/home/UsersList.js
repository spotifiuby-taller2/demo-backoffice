import React, {useEffect, useState} from "react";
import {Box, Button, Modal, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getSHAOf, getToGateway, postToGateway} from "../others/utils";
import * as constants from "../others/constants";
import {useNavigate} from "react-router-dom";
import {matrixStyles} from "../style/matrixStyles";
import Switch from '@mui/material/Switch';


const UsersList = (props) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [searchText, setSearchText] = useState("");
  const [addAdminModalVisible, setAddAdminModalVisible] = useState(false);
  const classes = matrixStyles();

  async function createAdmin(name, password) {
    if (password === "" || name === "" || name === undefined) {
      alert("Por favor, complete los campos del nuevo admin.");
      return;
    }
    const hashedPassword = password === undefined ? undefined : getSHAOf(getSHAOf(password));
    const requestBody = {
      email: name,
      password: hashedPassword,
      redirectTo: constants.USERS_HOST + constants.USERS_CREATE_ADMIN_URL
    }
    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      window.location.reload();
    }
  }

  const renderBlockedSwitch = (params) => {
    return (
      <Switch
        checked={! params.row
                         .isBlocked}
        onChange={async (e) => handleBlockedSwitch(e, params.row.id)}
        inputProps={{'aria-label': 'controlled'}}
      />
    );
  }

  async function handleBlockedSwitch(event, userId) {
    let url = constants.USERS_HOST + constants.USERS_UNLOCK_URL;

    if (! event.target.checked) url = constants.USERS_HOST + constants.USERS_BLOCK_URL;

    const requestBody = {
      userId,
      redirectTo: url
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      window.location.reload();
    }
  }

  async function handleVerifiedSwitch(event, userId) {
    let url = constants.USERS_HOST + constants.USERS_UNVERIFIED_URL;

    if (event.target.checked) url = constants.USERS_HOST + constants.USERS_VERIFIED_URL;

    const requestBody = {
      userId,
      redirectTo: url
    }

    const response = await postToGateway(requestBody);

    if (response.error !== undefined) {
      alert(response.error);
    } else {
      window.location.reload();
    }
  }

  const renderVerifiedSwitch = (params) => {
    return (
      <>
        {(params.row.isArtist) ?
          (<Switch
            checked={params.row.isVerified}
            onChange={async (e) => handleVerifiedSwitch(e, params.row.id)}
            inputProps={{'aria-label': 'controlled'}}
          />) :
          <></>
        }
      </>
    );
  }

  const renderGetProfile = (params) => {
    return (
      <Button style={{float: 'right'}} onClick={async () => {
        navigate(constants.PROFILE_URL + "/" + params.row.id)
      }}> Ver perfil
      </Button>
    );
  }

  async function getUsers() {
    let response = await getToGateway(constants.USERS_HOST + constants.USERS_LIST_URL,
      "?" + constants.API_KEY_QUERY_PARAM
      + constants.MY_API_KEY);

    if (response.error !== undefined) {
      return {
        "id": "",
        "email": "",
        "isAdmin": "",
        "isListener": "",
        "IsArtist": "",
        "isBlocked": "",
        "isVerified": "",
      }
    }
    return response.list;
  }

  // Component did mount
  useEffect(() => {
    document.body.style.backgroundColor = '#f9f6f4';

    const getServicesWrapper = async () => {
      const users = await getUsers();
      const response = await parseIsAdmin(users);
      setRows(response);
      setFilteredRows(response);
    };
    getServicesWrapper().then(r => r);
  }, []);

  const parseIsAdmin = async (response)  =>  {
    response.forEach( (x, i)  => {
      let text = '';

      if (x.isAdmin) {
        text += 'Administrador ';
      }

      if (x.isArtist) {
        text += 'Artista ';
      }

      if (x.isListener) {
        text += 'Oyente ';
      }

      x.isAdmin = text;
    } );

    return response;
  }

  const handleUserName = (event) => {
    setUserName(event.target.value);
  }

  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  }

  const handleSearchText = (event) => {
      const textInTextBox = event.target.value;

      setSearchText(textInTextBox);

      const lowerText = textInTextBox;

      const newRows = rows.filter(row => {
        return Object.keys(row)
            .filter(field => field.toString() !== "photoUrl")
            .some(field => {
              return row[field].toString()
                                .toLowerCase()
                                .includes(lowerText);
            });
      } );

    setFilteredRows(newRows);
  }

  const handlerModalOpen = () => setAddAdminModalVisible(true);
  const handlerModalClose = () => setAddAdminModalVisible(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: classes.headerCell,
      width: 350
    },
    {
      field: 'email',
      headerName: 'Correo',
      headerClassName: classes.headerCell,
      width: 300
    },
    {
      field: 'isAdmin',
      headerName: 'Rol',
      headerClassName: classes.headerCell,
      width: 250,
    },
    {
      field: 'isBlocked',
      headerName: 'Estado',
      width: 175,
      headerClassName: classes.headerCell,
      renderCell: renderBlockedSwitch
    },
    {
      field: 'isVerified',
      headerName: 'Verificado',
      headerClassName: classes.headerCell,
      width: 175,
      renderCell: renderVerifiedSwitch
    },
    {
      field: 'profile button',
      headerName: '',
      width: 200,
      headerClassName: classes.headerCell,
      renderCell: renderGetProfile
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
                           style={{width: 500, backgroundColor: '#f5fcff', borderRadius: 5}}
                           size={"small"}
                           autoFocus>
                </TextField>
              </TableCell>

              <TableCell>
                <Button variant="contained" style={{float: 'right'}} onClick={handlerModalOpen}>
                  Agregar administrador

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
                    <TextField onChange={handleUserName}
                               value={userName}
                               margin="normal"
                               label="Email"
                               size="small"
                               style={{width: 300, marginTop: 25}}
                               autoFocus
                    >
                    </TextField>

                    <TextField onChange={handleUserPassword}
                               value={userPassword}
                               margin="normal"
                               label="Password"
                               type="password"
                               size="small"
                               style={{width: 300}}
                               autoFocus
                    >
                    </TextField>
                    <Button onClick={() => createAdmin(userName, userPassword)} style={{width: 300, marginTop: 10}}>
                      Agregar administrador
                    </Button>
                  </Box>
                </Modal>
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

      <div style={{height: 1800, width: '100%'}}>
        <DataGrid
          rowClick="show"
          classes={{headerCell: classes.headerCell, row: classes.row}}
          rows={filteredRows}
          columns={columns}
          EnableHeadersVisualStyles={false}/>
      </div>
    </div>
  );
}

export {
  UsersList
}
