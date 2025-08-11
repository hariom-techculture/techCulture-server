import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description : {
        type : String,
        trim : true
    },
    designation :{ 
        type : String,
        trim : true
    },
    profilePicture : {
        type : String,
        default : ""
    },
    department : {
        type : String,
        trim : true
    },
    socialLinks : [
        {
            type : String,
            trim : true
        }
    ]
})

export default mongoose.model("Employee", EmployeeSchema)