import axios from 'axios';
import {UserAccount, UpdateAccount} from '../types/AccountTypes'
const API_URL = 'http://localhost:8000/api/user/';

export const AccountService = {
    getAccountDetails: async(): Promise<UserAccount | null> =>{
        try{
            const response = await axios.get<UserAccount>(API_URL);
            return response.data;
            } catch(error) {
                console.error('Error fetching account details:', error);
                return null;
            }
        },
    updateAccount: async(accountData:UpdateAccount):Promise<UserAccount | null> =>{
        try{
            const response = await axios.put(API_URL, accountData)
            return response.data;
        }catch(error){
            console.error('Error updating account:', error);
            return null;
            }
        },
    };