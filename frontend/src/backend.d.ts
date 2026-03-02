import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StaffMember {
    bio: string;
    name: string;
    role: string;
    photoUrl: string;
}
export interface BusinessHours {
    tuesday: string;
    wednesday: string;
    saturday: string;
    thursday: string;
    sunday: string;
    friday: string;
    monday: string;
}
export interface Service {
    name: string;
    description: string;
    durationMinutes: bigint;
    price: bigint;
}
export interface AppointmentRequest {
    service: string;
    name: string;
    submittedAt: bigint;
    preferredDateTime: string;
    phone: string;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    addService(name: string, description: string, price: bigint, durationMinutes: bigint): Promise<void>;
    addStaffMember(name: string, role: string, bio: string, photoUrl: string): Promise<void>;
    getAppointmentRequests(): Promise<Array<AppointmentRequest>>;
    getBusinessHours(): Promise<BusinessHours | null>;
    getContactInfo(): Promise<ContactInfo | null>;
    getServices(): Promise<Array<Service>>;
    getStaff(): Promise<Array<StaffMember>>;
    setBusinessHours(monday: string, tuesday: string, wednesday: string, thursday: string, friday: string, saturday: string, sunday: string): Promise<void>;
    setContactInfo(address: string, phone: string, email: string): Promise<void>;
    submitAppointmentRequest(name: string, phone: string, preferredDateTime: string, service: string): Promise<void>;
}
