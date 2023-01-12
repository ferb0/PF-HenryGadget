import { 
SET_USER_LOGIN,
GET_USERS,
GET_REVIEWS, 
CHANGE_REVIEW_VISIBLE,
CHANGE_REVIEW_ARCHIVE,
CHANGE_USER_ACTIVE, 
CHANGE_USER_ADMIN,
FORCE_RESET_PWD,
CHECK_USER_RESET_PWD,
URL,
PUT_PROFILE_USER
} from '../Constants/index'
import { getAuth,updateProfile } from 'firebase/auth'
import axios from 'axios'

export const setUserInFrontState = (payload)=>{
    return async function(dispatch){
        return dispatch({
            type: SET_USER_LOGIN,
            payload
        })
    }
}

export const loginApp = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/users/log",{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return data
        }catch(e){
            return e.message
        }
    }
}

export const logUserActivity = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/users/admin/log/",{
                method: "POST",
                body: JSON.stringify(payload),
                headers:{
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return data
        }catch(e){
            return e.message
        }
    }
}

export const getUsers = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + "/users/admin/",{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_USERS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}


export const getReviews = (payload)=>{
    return async function(dispatch){
        try{
            const response = await fetch(URL + '/reviews/admin/?archived=' + payload.archived,{
                method: "GET",
                headers:{
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return dispatch({
                type: GET_REVIEWS,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeReviewVisible = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/reviews/visible/' + payload.id + '?archived=' + payload.archived,{
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_REVIEW_VISIBLE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeReviewArchive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/reviews/archive/?archived=' + payload.archived,
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload.ids}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_REVIEW_ARCHIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeUserActive = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/admin/active/',
            {
                method: 'PUT',
                body: JSON.stringify({'ids': payload.id}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_USER_ACTIVE,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}

export const changeUserAdmin = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/admin/' + payload.id,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: CHANGE_USER_ADMIN,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }
}



export const putProfileUser = (payload)=>async (dispatch)=>{
        const auth = getAuth()
        const user = auth.currentUser
        
        if(payload.google === true){
            try {
                if(payload.idUser && payload.phoneNumber){
                     let put = await axios({
                    url: `${URL}/users/phone`,
                    method: 'put',
                    headers: {"Authorization":"Bearer " + payload.token},
                    data:{
                        idUser:payload.idUser,
                        phoneNumber:payload.phoneNumber
                    }
                    
                })
                if(payload.photoURL[0]){
                    updateProfile(user,{photoURL:payload.photoURL[0]})
                    .then (r => {                        
                        return dispatch({
                            type:PUT_PROFILE_USER,
                            payload:{...user,phoneNumber:payload.phoneNumber,photoURL:payload.photoURL[0]}
                        })
                    })
                    .catch(r => console.log(r))
                    }
                    if(!payload.photoURL[0] && payload.idUser && payload.phoneNumber ){
                        return dispatch({
                            type:PUT_PROFILE_USER,
                            payload:{
                                ...user,phoneNumber:put.data.phoneNumber
                            }
                        })
                    }
                }
              
               
            } catch (error) {
                console.log(error)
            }
        }
        if(payload.google === false){
            try {
                if(payload.idUser && payload.phoneNumber ){
                    let put = await axios({
                        url: `${URL}/users/phone`,
                        method: 'put',
                        headers: {"Authorization":"Bearer " + payload.token},
                        data:{
                            idUser:payload.idUser,
                            phoneNumber:payload.phoneNumber
                        }                        
                    })
                }
                if(payload.photoURL[0] && payload.displayName){
                    
                    updateProfile(user,{displayName:payload.displayName,photoURL:payload.photoURL[0]})
                    .then (r => {
                        
                        return dispatch({
                            type:PUT_PROFILE_USER,
                            payload:{...user,phoneNumber:payload.phoneNumber
                                ,photoURL:payload.photoURL[0],
                                displayName:payload.displayName}
                        })
                    })
                    .catch(r => console.log(r))
                }
                if(payload.photoURL[0] && !payload.displayName){
                    updateProfile(user,{photoURL:payload.photoURL[0]})
                    .then (r => {
                        
                        return dispatch({
                            type:PUT_PROFILE_USER,
                            payload:{...user,phoneNumber:payload.phoneNumber
                                ,photoURL:payload.photoURL[0],
                                }
                        })
                    })
                    .catch(r => console.log(r))
                }
                if(!payload.photoURL[0] && payload.displayName){
                    updateProfile(user,{displayName:payload.displayName})
                    .then (r => {
                        
                        return dispatch({
                            type:PUT_PROFILE_USER,
                            payload:{...user,
                                phoneNumber:payload.phoneNumber,                                
                                displayName:payload.displayName}
                        })
                    })
                    .catch(r => console.log(r))
                }
                
                
            } catch (error) {
                
            }
        }
      
}
export const forceResetPassword = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/admin/resetpwd/' + payload.id,
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "authorization":"Bearer " + payload.token
                }
            })
            const data = await response.json()
            return dispatch({
                type: FORCE_RESET_PWD,
                payload: data
            })
        }catch(e){
            return e.message
        }
    }

}

export const checkUserStatus = (payload) => {
    return async function(dispatch) {
        try {
            const response = await fetch(URL + '/users/checkstatus/',
            {
                method: 'POST',
                body: JSON.stringify({'email': payload}),
                headers: {
                    "Content-Type": "application/json",
                    "authorization":"Bearer " + payload
                }
            })
            const data = await response.json()
            return data.result;
        }catch(e){
            return e.message
        }
    }

}


