function isInAlphabet(c) {
    const res = (c.toLowerCase() >= 'a' &
    c.toLowerCase() <= 'z')
    return res
}

function isInNumber(c) {
    const res =  (c >= '0' & c <= '9')
    return res
}

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        let {username} = req.body
        if (username.length < 6 || username.length > 20) {
            return res.status(400).json({error:{message:'Имя пользователя должно содержать от 6 до 20 символов'}})
        }

        for(let i = 0; i < username.length; i++) {
            if (!(isInAlphabet(username[i]) ||
                isInNumber(username[i]))) {
                    return res.status(400).json({error:{message: 'Имя пользователя должно содержать только буквы латинского алфавита и цифры'}})
                }
            }
        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
    }
}