# Talon order service

The service provides opportunity to make an 
appointment with doctor. After registration, 
the platform allows seeing list of doctors, 
and make an appointment by choosing specialty of doctor
and date of appointment. After login doctor also can 
see all appointments to him. More information about 
appointment and option to cancel of its also available 
for patient and doctor.

###Used technologies

- JavaScript ES6+
- React
- MongoDB
- Mongoose
- Express
- Bootstrap

Before starting a project you need to create a folder named "config"
in root directory and then default.json file, where you need to write
json config:

{
"port": ,
"mongoUri": "",
"jwtSecret": "",
"baseUrl": "" // http://localhost:5000
}

