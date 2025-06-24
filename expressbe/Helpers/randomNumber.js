const generateRandom = (len = 100) => {
    let chars = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
    let strlen = chars.length;
    let random = "";
    for (let i = 0; i<len; i++){
        let posn = Math.round(Math.random()*(strlen-1))
        random += chars[posn]
    }
    return random
}

module.exports = generateRandom