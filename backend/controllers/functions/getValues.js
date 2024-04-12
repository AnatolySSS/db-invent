export const getValues = (valuesFromDb) => {

    const valuesArr = []
    let valuesObj = {}

    for (const key in valuesFromDb[0]) {
        valuesArr.push(key)
    }

    valuesArr.map(item => {
        valuesObj[item] = valuesFromDb.map(value => value[item]).filter(v => v !== null);
        valuesObj[item].push("");
    })

    return valuesObj;
}