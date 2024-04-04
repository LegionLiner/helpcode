import ApiCourse from "./ApiCourse";
import { CourseApi } from "../../Interfaces/Types";


export default class ApiModule {
        baseUrl = 'http://localhost:5173';
        
        course = new ApiCourse(this.baseUrl) as unknown as CourseApi
    constructor() {
    }

}