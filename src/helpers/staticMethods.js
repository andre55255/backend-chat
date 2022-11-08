const buildApiResponse = (success, statusCode, message, object) => {
    return {
        success,
        statusCode,
        message,
        object
    }
}

const buildResult = (success, message, object) => {
    return {
        success,
        message,
        object
    }
}

module.exports = {
    buildApiResponse,
    buildResult
}