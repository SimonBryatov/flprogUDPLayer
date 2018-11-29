function parseOut(ind, msg, checkValue) {
    return "\u0001" + ind + "\u0002" + msg + "\u0003" + checkValue + "\u0004"
}

function parseIn(data, controllerId) {
    data = data.toString();
    let dataIndex = Number(data.match(new RegExp("\u0001(.*?)\u0002"))[1])
    let msg = data.match(new RegExp("\u0002(.*?)\u0003"))[1]
    return {controllerId, msg, dataIndex}
}

module.exports = {parseIn, parseOut}