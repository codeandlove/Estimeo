const mongoose = require('mongoose');
const config = require('../../config/config');
const Category = require('../models/Category');
const Spectrum = require('../models/Spectrum');
const User = require('../models/User');
const spectrums = [
    {
        "slug": "elizabeth-warren",
        "value": 0,
        "example": "Elizabeth Warren"
    },
    {
        "slug": "little-liberal",
        "value": 1,
        "example": "A Little Liberal"
    },
    {
        "slug": "fairly-moderate",
        "value": 2,
        "example": "Fairly Moderate"
    },
    {
        "slug": "little-conservative",
        "value": 3,
        "example": "A Little Conservative"
    },
    {
        "slug": "mitch-mcconnel",
        "value": 4,
        "example": "Mitch McConnell"
    }
];
const categories = [
    {
        "name": "Criminal Justice",
        "slug": "criminal-justice"
    },
    {
        "name": "Culture & Society",
        "slug": "culture-society"
    },
    {
        "name": "Economic Affairs",
        "slug": "economic-affairs"
    },
    {
        "name": "Education",
        "slug": "education"
    },
    {
        "name": "Environment",
        "slug": "environment"
    },
    {
        "name": "Government Operations",
        "slug": "government-operations"
    },
    {
        "name": "Health",
        "slug": "health"
    },
    {
        "name": "Social Welfare",
        "slug": "social-welfare"
    },
    {
        "name": "Foreign Affairs",
        "slug": "foreign-affairs"
    }
];

const admin_password = config.admin_password ? config.admin_password : "TestAdmin";

const admin =  {
    name: "admin",
    surname: "admin",
    password: admin_password,
    company: "none",
    email: "null",
    verified: true
};

exports.setup = function(){
    console.log("Creating setup data...");

    /*
    spectrums.forEach(function(spectrum){
        let query = { slug: spectrum.slug };

        Spectrum.findOneAndUpdate(query, spectrum, {upsert:true}, function(error, result){
            if(error){
                console.log(error);
                //todo
            }
        });

    });

    categories.forEach(function(category){
        let query = { slug: category.slug };

        Category.findOneAndUpdate(query, category, { upsert: true }, function(error, result){
            if(error){
                console.log(error);
                //todo
            }
        });

    });

    */


    //Crete admin account (if not exists)
    //console.log("Create admin user");
    //
    // User.findOne({ name: admin.name }, function(err, adminObj){
    //     if(err){
    //         console.log(err)
    //     }else {
    //         if(!adminObj){
    //             const user = new User(admin);
    //
    //             user.save(function(err) {
    //                 if (err){
    //                     console.log(err);
    //                 }else {
    //                     console.log("Admin created!")
    //                 }
    //             });
    //         }
    //     }
    // });
};
