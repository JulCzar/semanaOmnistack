module
    .exports = arrAsStr => {
        return arrAsStr
            .split(',')
            .map(str => str.trim())
    }