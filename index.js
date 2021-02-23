const { readFile } = require('fs/promises')

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        // console.log(content)
        const users = File.parseCSVtoJSON(content)
        return users
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf8')
    }

    static parseCSVtoJSON(csvString) {
        const lines = csvString.split('\r\n')
        const firstLine = lines.shift()

        // console.log(firstLine)
        // console.log(lines)

        const header = firstLine.split(',').map(col => col.replace(/"/g, "").split(" "))
        const eidIndex = header.reduce((eidIndex, el, index) => eidIndex !== -1 ? eidIndex : el[0] === "eid"? index : -1, -1)
        // console.log(header)
        // console.log(header.length)
        let users = []
        lines.map(line => {
            // console.log(line.split(','))
            // const columns = line.split(',')

            const variants = line.match(/".*"/g)
            for (let index in variants) {
                const newValue = variants[index].replace(/"/g, "").replace(",", "%2C")
                line = line.replace(variants[index], newValue)
            }
            const columns = line.split(",").map(data => {
                let semiFormattedData = data.replace(":", "").replace(/[()-]/g, "").replace(" / ", "%2C").replace("/", "%2C").trim()
                // console.log(semiFormattedData)
                if (semiFormattedData.match(/\d\s/)) return [semiFormattedData.replace(" ","")]
                else return semiFormattedData.split("%2C")
            })

            // console.log(columns)
            let userIndexIfExists
            let user = users.find((user, index) => user.eid === columns[eidIndex][0] && (userIndexIfExists = index)) || {}
            for(const columnIndex in columns) {
                // console.log(header[columnIndex])
                const column = columns[columnIndex]
                const [type, ...tagsArray] = header[columnIndex]

                if (tagsArray.length > 0) {
                    for (let dataIndex in column) {
                        if (type !== "phone" || (type === "phone" && column[dataIndex].match(/^\d+$/) !== null)) {
                            let newEntry = {
                                type: type,
                                tags: [...tagsArray],
                                adress: column[dataIndex]
                            }

                            if (user.hasOwnProperty("adresses")) {
                                user.adresses = user.adresses.concat(newEntry)
                            } else {
                                user.adresses = [newEntry]
                            }
                        }
                    }
                } else {
                    if (["invisible", "see_all"].includes(type)) {
                        user[type] = ["yes", "1"].includes(column[0])
                    } else {
                        if (user.hasOwnProperty(type) && !["fullname", "eid"].includes(type)) {
                            if (typeof user[type] === "object" && user[type].hasOwnProperty("length")) {
                                user[type].concat(...column)
                            } else {
                                user[type] = [user[type], ...column]
                            }
                        } else {
                            if (column.length === 1) user[type] = column[0]
                            else user[type] = column
                        }
                    }
                }
            }
            // console.log(user)
            // console.log(userIndexIfExists ? 1 : 2)
            userIndexIfExists !== undefined ? users[userIndexIfExists] = user : users.push(user)
        })
        // console.log(users)
        return users
    }
}

(async() => {
    const filePath = './input.csv'
    try{
        const result = await File.csvToJson(filePath)
        console.log(result)
    } catch(err) {
        console.log(err)
    }
})()

//validar os inputs dos "usuários no arquivo csv" -> remover o "kkkkkkkk" (talvez usar "break" antes de atribuir o telefone?, ou verificar antes de atribuir)