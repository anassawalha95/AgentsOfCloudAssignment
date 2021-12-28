var express = require("express");
var router = express.Router();
const { User, Appointment } = require("../models");
const authenticationToken = require("../middleware/authentication");
const { Op } = require("sequelize");
router.get("/", authenticationToken, async function (req, res, next) {
  try {
    const users = await User.findAll({
      where: { role_type: "seller" },
    });

    const appointments = await Appointment.findAll({
      where: {
        [Op.or]: [
          { appointment_status: "accepted" },
          { appointment_status: "rejected" },
        ],
        service_requester_id: req.cookies.id,
      },
    });

    return res.json({ users, appointments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/request", authenticationToken, async function (req, res, next) {
  const { service_requester_id, appointment_status, appointment_id } = req.body;

  try {
    const appointments = await Appointment.update(
      { appointment_status: appointment_status },
      {
        where: {
          id: appointment_id,
          service_requester_id: service_requester_id,
        },
      }
    );

    return res.redirect(303, "/buyers/requests");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
