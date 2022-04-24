const LOGIN_TYPES = {
    activeDirectory: 1,
    loginPassword: 2
}
const USER_ROLES = {
    admin: 1,
    teacher: 2,
    student: 3,
    parent: 4
}
const TYPES_OF_STUDYING = {
    fullTime: 1, //очка
    extramural: 2 //заочка
}
const TYPES_OF_EXAM = {
    exam: 1,
    offset: 2
}
const TYPES_OF_SEMESTERS = {
    autumn: 1, // Осень
    spring: 2 // Весна
}
module.exports = {
    LOGIN_TYPES: LOGIN_TYPES,
    USER_ROLES: USER_ROLES,
    TYPES_OF_STUDYING: TYPES_OF_STUDYING,
    TYPES_OF_EXAM: TYPES_OF_EXAM,
    TYPES_OF_SEMESTERS: TYPES_OF_SEMESTERS
}