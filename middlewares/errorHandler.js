import next from "next";
import { errorConstants } from "../constants.js";

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
    const ct = errorConstants;

    switch(statusCode){
        case ct.VALIDATION_ERROR:
            res.json({title : "validation failed",message:err.message, stackTrace:err.stack});
            break;
        case ct.UNAUTHORIZED:
            res.json({title : "unauthorized ",message:err.message, stackTrace:err.stack});
            break;
        case ct.FORBIDDEN:
            res.json({title : "FORBIDDEN",message:err.message, stackTrace:err.stack});
            break;
        case ct.NOT_FOUND:
            res.json({title : "NOT_FOUND ",message:err.message, stackTrace:err.stack});
            break;
        case ct.SERVER_ERROR:
            res.json({title : "SERVER_ERROR ",message:err.message, stackTrace:err.stack});
            break;
        default:
            console.log("The Problem is : ", err);
    }
}; 


export {errorHandler};