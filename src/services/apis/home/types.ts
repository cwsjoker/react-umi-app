export namespace HomeApi {
    export type testGetResponse = {
        data?: {
            name: string;
        }[]
    }

    export type userCreateRequest = {
        name: string;
        age: number;
    }
}