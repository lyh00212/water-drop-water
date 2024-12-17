// 随机生成一个四位数的字符串
export const getRandomCode = () => {
    const code = []
    for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 9))
    }
    return code.join('')
}
