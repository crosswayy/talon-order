const {Router} = require('express');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const User = require("../models/User");

const router = Router();

// /api/doctors/

router.get('/', auth, async (req, res) => {
    try {
        const doctors = await User.find( {isDoctor: true} );
        const result = doctors.map(doctor => {
            return {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                speciality: doctor.speciality,
                years: doctor.years,
                id: doctor.id
            }
        });

        res.status(200).json({ result });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong..." });
    }
})

module.exports = router;
