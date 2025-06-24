const CustomerInquiryService = require('../services/customer_inquiries.service')
class CustomerInquiry{
    constructor(){
        this.customer_inquiry_srv = new CustomerInquiryService()
    }
    createInquiry = async(req, res, next) => {
        try{
            let data = req.body;
            this.customer_inquiry_srv.validateData(data);
            let store = await this.customer_inquiry_srv.customer_inquiries(data)
            res.json({
                result: store,
                msg: "Inqiry has been placed towards admin",
                status: true
            })


        }catch(err){
            next(err)
        }
    }
    fetAllInquiry = async(req, res, next) => {
        try{
            let result = await this.customer_inquiry_srv.fetchAllDateInquiry()
            res.json({
                result: result,
                msg: "Fetched All Data Inquiries",
                status: true
            })

        }catch(err){
            next(err)
        }
    }
}
module.exports = CustomerInquiry