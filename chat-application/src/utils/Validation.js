
export const loginValidation = (input) => {
    const error = {}
    if (input.email === "") {
        error.email = "Please enter email"
    }
    if (input.password === "") {
        error.password = "Please enter password"
    }
    return error
}
export const signupValidation = (input) => {
    const error = {}
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (input.email === "") {
        error.email = "Please enter email"
    } else  if (!pattern.test(input.email)) {
        error.email = "Please enter valid email address."



    }
    if (input.username === "") {
        error.username = "Please enter username"
    } else if (input.username.length <= 4) {
        error.username = "username should  be greater than 5 letters"

    }
    if (input.password === "") {
        error.password = "Please enter password"
    }
    if (input.confirmPassword === "") {
        error.confirmPassword = "Please enter confirm   password"
    }
    if (input.profilePicture === null) {
        error.profilePicture = "Please select profile picture"
    }
    return error
}
export const passwordForgetValidation = (input) => {
    const error = {}
    if (input.email === "") {
        error.email = "Please enter email"
    }

    return error
}


