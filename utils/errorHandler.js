class AppError extends Error{
    constructer(code,statusCode){
        super(code)
        this.error = code 
        this.statusCode = statusCode
    }
}

module.exports = AppError