import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment completion
const appointmentComplete = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

        res.json({ success: true, message: 'Appointment Completed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to seed 5 new dummy users and diverse appointments
const seedDummyData = async (req, res) => {
    try {
        await userModel.deleteMany({});
        await appointmentModel.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const defaultPassword = await bcrypt.hash("password123", salt);

        const dummyUsersData = [
            {
                name: "Alex Johnson",
                email: "alex.johnson@example.com",
                password: defaultPassword,
                phone: "+1 (555) 234-5678",
                address: { line1: "124 Maple Street", line2: "New York, NY" },
                gender: "Male",
                dob: "1994-05-15"
            },
            {
                name: "Sophia Martinez",
                email: "sophia.martinez@example.com",
                password: defaultPassword,
                phone: "+1 (555) 876-5432",
                address: { line1: "456 Oak Avenue", line2: "Los Angeles, CA" },
                gender: "Female",
                dob: "1998-08-22"
            },
            {
                name: "David Miller",
                email: "david.miller@example.com",
                password: defaultPassword,
                phone: "+1 (555) 345-6789",
                address: { line1: "789 Pine Road", line2: "Chicago, IL" },
                gender: "Male",
                dob: "1988-11-04"
            },
            {
                name: "Emma Wilson",
                email: "emma.wilson@example.com",
                password: defaultPassword,
                phone: "+1 (555) 987-6543",
                address: { line1: "321 Cedar Lane", line2: "Houston, TX" },
                gender: "Female",
                dob: "2000-02-18"
            },
            {
                name: "James Taylor",
                email: "james.taylor@example.com",
                password: defaultPassword,
                phone: "+1 (555) 456-7890",
                address: { line1: "654 Elm Boulevard", line2: "Miami, FL" },
                gender: "Male",
                dob: "1991-09-30"
            }
        ];

        const createdUsers = [];
        for (let i = 0; i < dummyUsersData.length; i++) {
            const user = new userModel(dummyUsersData[i]);
            const savedUser = await user.save();
            createdUsers.push(savedUser.toObject());
        }

        const doctors = await doctorModel.find({});

        const today = new Date();
        const formatDate = (offsetDays) => {
            const d = new Date(today);
            d.setDate(today.getDate() + offsetDays);
            return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`;
        };

        const u0 = createdUsers[0];
        const u1 = createdUsers[1];
        const u2 = createdUsers[2];
        const u3 = createdUsers[3];
        const u4 = createdUsers[4];

        const d0 = doctors[0] ? doctors[0].toObject() : {};
        const d1 = doctors[1] ? doctors[1].toObject() : {};
        const d2 = doctors[2] ? doctors[2].toObject() : {};
        const d3 = doctors[3] ? doctors[3].toObject() : {};
        const d4 = doctors[4] ? doctors[4].toObject() : {};

        const dummyAppointmentsData = [
            {
                userId: u0._id.toString(),
                docId: d0._id ? d0._id.toString() : "",
                slotDate: formatDate(2),
                slotTime: "10:00 AM",
                userData: u0,
                docData: d0,
                amount: d0.fees || 150,
                date: Date.now() - 86400000 * 2,
                cancelled: false,
                payment: true,
                isCompleted: false
            },
            {
                userId: u1._id.toString(),
                docId: d1._id ? d1._id.toString() : "",
                slotDate: formatDate(3),
                slotTime: "11:30 AM",
                userData: u1,
                docData: d1,
                amount: d1.fees || 180,
                date: Date.now() - 86400000,
                cancelled: false,
                payment: false,
                isCompleted: false
            },
            {
                userId: u2._id.toString(),
                docId: d2._id ? d2._id.toString() : "",
                slotDate: formatDate(-1),
                slotTime: "02:00 PM",
                userData: u2,
                docData: d2,
                amount: d2.fees || 100,
                date: Date.now() - 86400000 * 3,
                cancelled: false,
                payment: true,
                isCompleted: true
            },
            {
                userId: u3._id.toString(),
                docId: d3._id ? d3._id.toString() : "",
                slotDate: formatDate(1),
                slotTime: "04:30 PM",
                userData: u3,
                docData: d3,
                amount: d3.fees || 120,
                date: Date.now() - 86400000 * 4,
                cancelled: true,
                payment: false,
                isCompleted: false
            },
            {
                userId: u4._id.toString(),
                docId: d4._id ? d4._id.toString() : "",
                slotDate: formatDate(4),
                slotTime: "01:00 PM",
                userData: u4,
                docData: d4,
                amount: d4.fees || 150,
                date: Date.now() - 86400000 * 1,
                cancelled: false,
                payment: true,
                isCompleted: false
            },
            {
                userId: u1._id.toString(),
                docId: d0._id ? d0._id.toString() : "",
                slotDate: formatDate(-2),
                slotTime: "09:30 AM",
                userData: u1,
                docData: d0,
                amount: d0.fees || 150,
                date: Date.now() - 86400000 * 5,
                cancelled: false,
                payment: true,
                isCompleted: true
            }
        ];

        for (let i = 0; i < dummyAppointmentsData.length; i++) {
            const app = new appointmentModel(dummyAppointmentsData[i]);
            await app.save();
        }

        res.json({
            success: true,
            message: "Purged old data and seeded 5 new dummy users with diverse appointments!",
            usersCount: createdUsers.length,
            appointmentsCount: dummyAppointmentsData.length
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for adding Doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image", folder: "prescripto/doctors" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const feeMap = {
    500: 150,
    600: 180,
    50: 150,
    60: 180,
    30: 100,
    40: 120
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')

        for (let i = 0; i < doctors.length; i++) {
            const doc = doctors[i];
            if (doc.fees > 200 || doc.fees < 100) {
                let newFee = feeMap[doc.fees] || (doc.fees >= 500 ? 150 : (doc.fees < 100 ? 120 : 150));
                if (newFee > 200) newFee = 150;
                if (newFee < 100) newFee = 100;
                await doctorModel.findByIdAndUpdate(doc._id, { fees: newFee });
                doctors[i].fees = newFee;
            }
        }

        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    appointmentComplete,
    addDoctor,
    allDoctors,
    adminDashboard,
    seedDummyData
}