// Create tour controller
import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Fail to Create. Try Again..!" });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updateTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Fail to Updated. Try Again..!" });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Fail to Delete. Try Again..!" });
  }
};

// get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tour,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not Found. Try Again..!" });
  }
};

// get all tour
export const getAllTour = async (req, res) => {
  // paginationn
  const page = parseInt(req.query.page);
  console.log(page);

  // end pagination
  try {
    const tours = await Tour.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Not Found. Try Again..!" });
  }
};

// get tour by search

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  // i mean case sensitive

  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
};
