var express = require("express");
var router = express.Router();
const { User, Appointment } = require("../models");
const authenticationToken = require("../middleware/authentication");

/* GET home page. */

router.get("/", authenticationToken, async function (req, res, next) {
  try {
    const users = await User.findAll({
      where: { role_type: "buyer" },
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/requests", authenticationToken, async function (req, res, next) {
  try {
    const usersWithAppointments = await Appointment.findAll({
      where: {
        service_provider_id: req.cookies.id,
        appointment_status: "undecided",
      },
      include: User,
    });

    return res.json(usersWithAppointments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.post(
  "/request/creat",
  authenticationToken,
  async function (req, res, next) {
    try {
      const { serviceProviderId, schedualDate } = req.body;
      const serviceRequesterId = req.cookies.id;

      const validateAppointmentBeforeInsert = await Appointment.count({
        where: {
          service_requester_id: serviceRequesterId,
          service_provider_id: serviceProviderId,
        },
      });
      if (validateAppointmentBeforeInsert == 0) {
        const appointments = await Appointment.create({
          appointment_status: "undecided",
          service_requester_id: serviceRequesterId,
          service_provider_id: serviceProviderId,
          description: null,
          selected_date: schedualDate,
        });

        return res.json(appointments);
      } else {
        return res.json({ error: "appointment already scheduled" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
);

module.exports = router;
