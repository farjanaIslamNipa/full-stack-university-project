import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async(req, res) => {
  const {adminId} = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins is retrieved successfully',
    data: result,
  });
})

const updateAdmin = catchAsync(async(req, res) => {
  const {adminId} = req.params;
  const result = await AdminServices.updateAdminIntoDB(adminId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins is updated successfully',
    data: result,
  });
})

const deletedAdmin = catchAsync(async(req, res) => {
  const {adminId} = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
})

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deletedAdmin
}