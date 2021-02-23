let line = 'John Appleseed,1222,"Turma 2,Turma 5", Turma 6,Diurno,john.appleseed1@exemplo.com,(11) 99990-1235,dad.appleseed1@exemplo/dad.appleseed2@exemplo.com,(11) 99991-1235,yes,no'
const variants = line.match(/".*"/g)
for (let index in variants) {
    const newValue = variants[index].replace(/"/g, "").replace(",", "%2C")
    line = line.replace(variants[index], newValue)
}
const columns = line.split(",").map(data => {
    let semiFormattedData = data.trim().replace(/[()-]/g, "")
    console.log(semiFormattedData)
    if (semiFormattedData.match(/\d\s/)) return [semiFormattedData.replace(" ","")]
    else return semiFormattedData.split("%2C")
})

console.log(columns)