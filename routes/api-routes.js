// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({raw:true}).then(function(data) {
      var hbsObject = {
        Burger: data
      };
      // console.log(hbsObject);
      res.render("index", hbsObject);
    });
      
     
  });


  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(burger_db) {
      res.json(burger_db);
    })
      .catch(function(err) {
        res.json(err);
      });
  });

  // DELETE route for deleting burgers
  app.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(burger_db) {
      res.json(burger_db);
    });

  });

  // PUT route for updating burgers. 
  app.put("/api/burgers", function(req, res) {
    console.log(req.body)
    db.Burger.update({
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.json(data);
    })
      .catch(function(err) {
        res.json(err);
      });
  });
};
