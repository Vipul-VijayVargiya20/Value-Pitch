
const userModel = require('../model/userModel')
const { isValid, isValidEmail, isValidObjectId, isValidImage } = require('../Utils/validators')
const aws = require("../Utils/aws");


const register = async (req, res) => {

    try {

        let requestBody = JSON.parse(JSON.stringify(req.body));

        let { Name, Email, Avatar, Address, Country, Age } = requestBody

        if (!isValid(Name)) {
            res.status(400).send({ message: `invalid Name Input` })
        }

        if (!isValidEmail(Email)) {
            res.status(400).send({ message: `invalid Email` })
        }

        if (!isValid(Address)) {
            res.status(400).send({
                message: 'invalid Address'
            })
        }

        if (!isValid(Country)) {
            res.status(400).send({
                message: `invalid Country`
            })
        }

        let files = req.files;

        if (files && files.length > 0) {

            if (!isValidImage(files[0])) {
                return res.status(400).send({ status: false, message: `invalid image type` });
            }

        } else {
            return res.status(400).send({ status: false, message: "No file to write" });
        }

        Avatar = await aws.uploadFile(files[0]);

        let finalData = {

            Name,
            Email,
            Avatar,
            Address,
            Country,
            Age,

        }

        let newUser = await userModel.create(finalData);
        return res.status(201).send({ status: true, message: "Success", data: newUser });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: `Something Went Wrong`
        })
    }

}

const updateUser = async (req, res) => {

    try {

        let userId = req.params.userId.trim();

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid user Id" });
        }

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ staus: false, message: "User does not exist" });
        }


        const requestBody = req.body

        let { Name, Email, Address, Country } = requestBody;

        filter = {};


        if (requestBody.hasOwnProperty("Email")) {

            if (!isValidEmail(Email)) {
                return res.status(400).send({ status: false, message: `Please enter email` })
            }

            filter["Email"] = Email;

        }


        if (requestBody.hasOwnProperty("Name")) {

            if (!isValid(Name)) {
                return res.status(400).send({ status: false, message: "Please enter phone nummber" });
            }
            filter["Name"] = Name

        }

        if (requestBody.hasOwnProperty("Address")) {

            if (!isValid(Address)) {
                return res.status(400).send({ status: false, message: "Please enter a name" });
            }

            filter["Address"] = Address

        }

        if (requestBody.hasOwnProperty("Country")) {

            if (!isValid(cuntry)) {
                return res.status(400).send({ status: false, message: "Please enter a last name" });
            }

            filter["Country"] = Country

        }

        //update
        let updatedProfile = await userModel.findOneAndUpdate(

            { _id: userId },
            { $set: filter },
            { new: true }

        )

        return res.status(200).send({ status: true, message: "Profile updated successfuly", data: updatedProfile });

    } catch (error) {
        res.status(500).send({
            message: `Something Went Wrong`
        })
    }

}


const getAllUser = async (req, res) => {

    try {

        let allUsers = userModel.find({})
        res.status(200).send({ message: `success`, Data: allUsers })

    } catch (error) {
        res.status(500).send({
            message: `Something Went Wrong`
        })
    }

}

const getUserById = async (req, res) => {

    try {

        const userParams = req.params.userId.trim();

        if (!isValidObjectId(userParams)) {
            return res.status(400).send({ status: false, message: "Inavlid userId.Please enter a correct objectId" });
        }

        const findUser = await userModel.findOne({ _id: userParams });

        if (!findUser) {
            return res.status(404).send({ status: false, message: `User ${userParams} does not exist.` });
        }

        return res.status(200).send({ status: true, message: "granted", data: findUser });


    } catch (error) {
        res.status(500).send({
            message: `Something Went Wrong`
        })
    }

}

module.exports = {
    register,
    updateUser,
    getAllUser,
    getUserById
}