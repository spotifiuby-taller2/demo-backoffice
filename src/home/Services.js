import "../style/HomePageRoutes.css";
import { Table,
         TableHead,
         TableBody,
         TableRow,
         TableCell,
         Button} from '@mui/material';

const constants = require("../others/constants");
const { postTo } = require("../others/utils");

async function getServices() {
    const requestBody = {
        "api_key": constants.MY_API_KEY
    };

    const response = await fetch(constants.SERVICES_HOST + constants.SERVICES_URL, {
                            method: "GET",
                            headers: constants.JSON_HEADER,
                            body: JSON.stringify(requestBody)
                        }
                    ).catch(error => {
                        return {
                            error: error.toString()
                        };
                    } );

    if (response.error !== undefined) {
        return {
            "name": "",
            "api_key": "",
            "status": ""
        }
    }

    return response;
}

async function disableKey(api_key) {
    const requestBody = {
        "api_key": constants.MY_API_KEY,
        "api_key_to_disable": api_key
    }

    const response = await postTo(constants.SERVICES_HOST + constants.API_KEY_DOWN_URL,
                                  requestBody);

    if (response.error !== undefined) {
        alert(response.error);
    }
}

async function getDisableButton(api_key) {
    return (
        <Button onClick={await disableKey(api_key)}
            >Desactivar
        </Button>
    )
}

const Services = (props) => {
    return(
        <div>
            <div>
            <br/>
            <br/>
            <br/>
            </div>
        <div>
        <Table border={1}
               cellPadding={10}>
            <TableHead>
                <TableRow>
                    <TableCell>Servicio</TableCell>
                    <TableCell>API-KEY</TableCell>
                    <TableCell>Estado</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    Object.keys( getServices() ).map(function (element) {
                        return <TableRow>
                                    <TableCell>{element.name}</TableCell>
                                    <TableCell>{element.api_key}</TableCell>
                                    <TableCell>{element.status}</TableCell>
                                    <TableCell>{getDisableButton(element.api_key)}</TableCell>
                               </TableRow>;
                    } )
                }
            </TableBody>
        </Table>
        </div>

        </div>
    );
}

export {
    Services
}
