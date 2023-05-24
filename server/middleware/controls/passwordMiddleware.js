function isInAlphabet(c) {
    return (c.toLowerCase() >= 'a' &
    c.toLowerCase() <= 'z')
}

function isInNumber(c) {
    return (c >= '0' & c <= '9')
}

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        let {password} = req.body
        //console.log(password)
        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({error:{message:'Пароль обязан содержать от 8 до 20 символов'}})
        }
        
        for(let i = 0; i < password.length; i++) {
            if (!(isInAlphabet(password[i]) ||
                isInNumber(password[i]))) {
                    return res.status(400).json({error:{message: 'Пароль может содержать только буквы латинского алфавита и цифры'}})
            }
        }

        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({error: {message: "Внутренняя ошибка сервера"}})
    }
}