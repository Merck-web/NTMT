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

async function getSchedule(group, file, reply) {
    await readXlsxFile(`./public/schedule/${file}.xlsx`, {schema}, group).then(async (arr) => {
        let ob = new Map()
        let array = []
        for (let i = 0; i < arr.rows.length; i++) {
            if (arr.rows[i].group == group) {
                array.push(arr.rows[i])
            }
        }
        ob.set(group, array)
        const scheduleData = ob.get(group)
        await reply.send(scheduleData)
        return scheduleData
    })
}

module.exports = {
    getSchedule: getSchedule
}