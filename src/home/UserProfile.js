import React, {useState} from "react";
import * as constants from "../others/constants";
import { getToGateway } from "../others/utils";
import {TextField} from "@mui/material";

const getProfileOf = async (id) => {
    const response = await getToGateway(constants.USERS_HOST + constants.PROFILE_URL,
        "?" + constants.USER_ID_QUERY_PARAM
        + id);

    if (response.error !== undefined) {
        alert(response.error);
    }

    return response;
}

const UserProfile = async (id) => {
    const userId = window.location
                         .href
                         .split(constants.PROFILE_URL + "/")[1];

    const profile = await getProfileOf(userId);

    { /*
    'email': user.email,
        'phoneNumber': user.phoneNumber,
        'name':  user.name,
        'surname':  user.surname,
        'isArtist':  user.isArtist,
        'isListener':  user.isListener,
        'isAdmin':  user.isAdmin,
        'metal': user.metal,
        'rap':  user.rap,
        'pop':  user.pop,
        'classic':  user.classic,
        'electronic':  user.electronic,
        'jazz':  user.jazz,
        'reggeaton':  user.reggeaton,
        'indie':  user.indie,
        'punk':  user.punk,
        'salsa':  user.salsa,
        'blues':  user.blues,
        'rock':  user.rock,
        'other':  user.other */ }

    return (
        <TextField>
        </TextField>
    );
}

export {
    UserProfile
}
