import React, { createContext, useState, useEffect, useContext } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const CurrentUserProfileContext = createContext()
export const SetCurrentUserProfileContext = createContext()

export const useCurrentUserProfile = () => useContext(CurrentUserProfileContext)
export const useSetCurrentUserProfile = () => useContext(SetCurrentUserProfileContext)

export const CurrentUserProfileProvider = ({ children }) => {
    const [currentUserProfile, setCurrentUserProfile] = useState(null)
    const currentUser = useCurrentUser()

    
    useEffect(() => {
        const fetchCurrentUserProfile = async () => {
            if (!currentUser?.profile_id) return
            try {
                const { data } = await axiosReq.get(`/profiles/${currentUser?.profile_id}`)
                setCurrentUserProfile(data)
            } catch (err) {
                console.log(err)
                setCurrentUserProfile(null)
            }
        }
        fetchCurrentUserProfile()
    }, [currentUser])

    return (
        <CurrentUserProfileContext.Provider value={currentUserProfile}>
            <SetCurrentUserProfileContext.Provider value={setCurrentUserProfile}>
            {children}
            </SetCurrentUserProfileContext.Provider>
        </CurrentUserProfileContext.Provider>
    )
}

