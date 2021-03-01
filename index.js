const { readFile, writeFile } = require('fs').promises

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const users = File.parseCSVtoJSON(content)
        return users
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf8')
    }

    static parseCSVtoJSON(csvString) {
        const lines = csvString.split('\r\n')
        const firstLine = lines.shift()

        const header = firstLine.split(',').map(col => col.replace(/"/g, "").split(" "))
        const eidIndex = header.reduce((eidIndex, el, index) => eidIndex !== -1 ? eidIndex : el[0] === "eid"? index : -1, -1)

        let users = []
        lines.map(line => {
            const variants = line.match(/".*"/g)
            for (let index in variants) {
                const newValue = variants[index].replace(/"/g, "").replace(",", "%2C")
                line = line.replace(variants[index], newValue)
            }
            const columns = line.split(",").map(data => {
                let semiFormattedData = data.replace(":", "")
                                            .replace(/[()-]/g, "")
                                            .replace(/\s*\/\s*/g, "%2C")
                                            .trim()
                if (semiFormattedData.match(/\d\s/)) return [semiFormattedData.replace(" ","")]
                else {
                    const formattedData = semiFormattedData.split("%2C").map(data => data !== "" ? data.trim() : data)
                    return formattedData
                }
            })

            let userIndexIfExist
            const userIfExist = users.find((user, index) => {
                if (user.eid === columns[eidIndex][0]) {
                    userIndexIfExist = index
                    return true
                }
            })
            let user = userIfExist !== undefined? userIfExist : {}

            for(const columnIndex in columns) {
                const column = columns[columnIndex]
                const [type, ...tagsArray] = header[columnIndex]

                if (tagsArray.length > 0) {
                    if (column[0] !== "") {
                        for (let dataIndex in column) {
                            if (type !== "phone" || (type === "phone" && (column[dataIndex].match(/^\d{11}$/) !== null || column[dataIndex].match(/^\d{13}$/) !== null))) {
                                const address = type !== "phone" ? column[dataIndex] 
                                : column[dataIndex].match(/^\d{11}$/) !== null ? "55" + column[dataIndex]
                                : column[dataIndex]
                                
                                let newEntry = {
                                    type: type,
                                    tags: [...tagsArray],
                                    address: address
                                }

                                if (user.hasOwnProperty("addresses")) {
                                    user.addresses = user.addresses.concat(newEntry)
                                } else {
                                    user.addresses = [newEntry]
                                }
                            }
                        }
                    }
                } 
                
                else {
                    if (["invisible", "see_all"].includes(type)) {
                        user[type] = ["yes", "1"].includes(column[0])
                    } 
                    
                    else if (type === "group") {
                        if (column[0] !== "") {
                            if (user.hasOwnProperty("groups")) {
                                column.map(data => {
                                    if (!user["groups"].includes(data)) user["groups"].push(data)
                                })
                            } else {
                                user["groups"] = column
                            }
                        }
                    } 
                    
                    else {
                        if (user.hasOwnProperty(type) && !["fullname", "eid"].includes(type)) {
                            if (typeof user[type] === "object" && user[type].hasOwnProperty("length")) {
                                user[type].push(...column)
                            } else {
                                user[type] = [user[type], ...column]
                            }
                        } 
                        else {
                            if (column.length === 1) user[type] = column[0]
                            else user[type] = column
                        }
                    }
                }
            }
            
            const stringFields = ["fullname", "invisible", "see_all"]
            for (let fieldIndex in stringFields) {
                if (!Object.keys(user).includes(stringFields[fieldIndex])) user[stringFields[fieldIndex]] = ""
            }

            const arrayFields = ["groups", "addresses"]
            for (let fieldIndex in arrayFields) {
                if (!Object.keys(user).includes(arrayFields[fieldIndex])) user[arrayFields[fieldIndex]] = []
            }

            userIndexIfExist !== undefined ? users[userIndexIfExist] = user : users.push(user)
        })
        return users
    }
}



(async() => {
    const filePath = './input.csv'
    try{
        const result = await File.csvToJson(filePath)
        await writeFile("output.json", await JSON.stringify(result))
    } catch(err) {
        console.log(err)
    }
})()

