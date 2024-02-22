import mongoose from "mongoose";


export interface User {
    _id?: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    refreshToken?: string;
    configs: UserConfig;
    personal_data: PersonalData;
    active?: boolean;
    register_date?: Date
    terms_conditions: boolean
}

export interface AddressData {
    city: string;
    number: string;
    street: string;
    zip_code: string;
    complement: string;
    state: string;
    neighborhood: string;
}

export interface GenderOption {
    value: {
        gender: string;
        value: string
    };
    label: string;
}

export interface PersonalData {
    name: string;
    birth_date: Date;
    mobile_phone: string;
    address: AddressData;
    gender: GenderOption;
    social_name: string;
    profile_image?: string;
}

export interface ServiceOptions {
    pix_key: string,
    credit_card_payment: boolean
}

export interface CalendarOptions {
    opening_hours: any[]
}

export interface UserConfig {
    _id?: mongoose.Schema.Types.ObjectId,
    theme: string,
    language: string,
    font_size: number,
    calendar_options: CalendarOptions,
    service_options: ServiceOptions
}



export interface AuthReponse {
    access_token: string;
    refresh_token: string;
}
