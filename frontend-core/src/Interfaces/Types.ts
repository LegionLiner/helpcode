import { User } from "./User";

export type Methods = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type Request = (path: string, method: Methods, query: {}, data: {}) => Promise<Response<any>>
export interface Response<ResponseData> {
    status: boolean, 
    message: string,
    data: ResponseData
}

export interface CourseApi {
    getCourses: (name?: string, stars?: number) => Promise<Response<any>>,
    setStars: (course_id: string | number, stars: number) => Promise<Response<any>>,
    getComments: (course_id: string | number, count: number) => Promise<Response<any>>,
    setComments: (course_id: string | number) => Promise<Response<any>>,
}

export interface UserApi {
    getInfo: (user_id: string | number) => Promise<Response<any>>,
    setInfo: (user_id: string | number, data: Object) => Promise<Response<any>>,
    getFeatured: (user_id: string | number) => Promise<Response<any>>,
    setFeatured: (user_id: string | number, data: {}) => Promise<Response<any>>,
}

export interface Api {
    course: CourseApi,
    user: UserApi
}

export interface Store {
    course: object,
    user: User
}

export interface Core {
    api: Api,
    store: Store
}