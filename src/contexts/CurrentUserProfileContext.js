import React, { createContext, useState, useEffect, useContext, Children } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";

export const CurrentUserProfileContext = createContext()

export const useCurrentUserProfile = () => useContext(CurrentUserProfileContext)

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
            {children}
        </CurrentUserProfileContext.Provider>
    )
}

