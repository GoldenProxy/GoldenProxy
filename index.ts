type m = {
    msg: String
}


let str: m | null = { msg: 'Hello, World!' }

console.log(str?.msg)