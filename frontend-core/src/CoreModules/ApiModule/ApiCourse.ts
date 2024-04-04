import { Response } from '../../Interfaces/Types.ts';
import { CourseResponse, StarsResponse, CommentsResponse, Comment, Course } from '../../Interfaces/Course.ts';
import courses from './courses.json';

const allCourses = courses as unknown as Course[]


export default class ApiCourse {
    baseUrl: any;
    constructor(url: string) {
        this.baseUrl = url;
    }

    public async getCourses(name?: string, stars?: number): Promise<Response<CourseResponse>> {
        // запрос на сервер с возвратом списка курсов
        // фильтр по name и по stars, если их нет - последние X курсов
        return {
            status: true,
            message: 'Успешно найдены курсы по запросу',
            data: {
                courses: allCourses.filter((course: Course) => {         
                    let nameValid = true;
                    let starsValid = true;

                    if (name) {
                        nameValid = course.title.toLowerCase().includes(name.toLowerCase()) || course.description.full.toLowerCase().includes(name.toLowerCase()) || course.description.short.toLowerCase().includes(name.toLowerCase());

                    }
                    if (stars) {
                        starsValid = course.rate.stars >= stars;
                    }
                    return nameValid && starsValid;
                })
            }
        }
    }
    public async setStars(course_id: string | number, stars: number): Promise<Response<StarsResponse>> {
        // запрос на сервер с возвратом айди круса, которому присвоена звезда
        return {
            status: true,
            message: 'Успешно обновлена оценка курсу',
            data: {
                course_id,
                starCount: 5
            }
        }
    }
    public async getComments(course_id: string | number): Promise<Response<CommentsResponse>> {
        // запрос на сервер с возвратом комментариев для курса
        return {
            status: true,
            message: 'Успешно полученны комментарии курса',
            data: {
                course_id,
                comments: {}
            }
        }
    }
    public async setComments(course_id: string | number, comment: Comment, del: boolean = false): Promise<Response<CommentsResponse>> {
        // запрос на сервер с возвратом измененных комментарий для курса
        return {
            status: true,
            message: 'Успешно добавлен|удален комментарий к курсу',
            data: {
                course_id,
                comments: {}
            }
        }
    }
}
