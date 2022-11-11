import {createContext} from "react";
import VerifyAdmin from "./VerifyAdmin";

const ProfileNameContext = createContext({});

const AuthProviderContext = createContext({VerifyAdmin});

const Context = {ProfileNameContext, AuthProviderContext};

export default Context;