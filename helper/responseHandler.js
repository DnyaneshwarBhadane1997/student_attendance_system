

class responseHandler {
    sendToClient(res ,dataToSend , stutusCode){
        res.status(stutusCode).json({ data : dataToSend.data , message: dataToSend.message, status_code: stutusCode});
    }
}
let responseController = new responseHandler();
module.exports =  responseController;