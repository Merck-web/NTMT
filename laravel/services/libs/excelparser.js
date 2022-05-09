const readXlsxFile = require('read-excel-file/node')
const schema = {
    'Группа': {
        prop: 'group',
        type: String
    },
    'Пара': {
        prop: 'count',
        type: Number
    },
    'Дисциплина': {
        prop: 'lesson',
        type: String
    },
    'ФО': {
        prop: 'fo',
        type: Number
    },
    'ФИО Преподавателя': {
        prop: 'teacher',
        type: String
    }
}

function getSchedule(group, file) {
    readXlsxFile(`./${file}.xlsx`, {schema}, group).then((arr) => {
        let ob = new Map()
        let array = []
        for (let i = 0; i < arr.rows.length; i++) {
            if (arr.rows[i].group == group) {
                array.push(arr.rows[i])
            }
        }

        ob.set(group, array)
        console.log(ob.get(group))
        return ob.get(group)
    })
}

module.exports = {
    getSchedule: getSchedule
}