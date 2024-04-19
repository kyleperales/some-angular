export enum Status {
    listed = 0,
    examining,
    backToHuman
}

export interface IPetDetails {
    id: number
    name: string
    status: Status
}