function parseOut(ind, msg, checkValue) {
    return "\u0001" + ind + "\u0002" + info + "\u0003" + 132519252 + "\u0004"
}

function parseIn(data) {
    let ind = Number(el.match(new RegExp("\u0001(.*?)\u0002"))[1])
    let msg = el.match(new RegExp("\u0002(.*?)\u0003"))[1]
    return {ind, msg}
}

module.exports = {parseIn, parseOut}